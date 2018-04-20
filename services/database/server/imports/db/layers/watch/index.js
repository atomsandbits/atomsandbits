import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import {
  Layers,
  Calculations,
  Clusters,
  Requests,
  UserResults,
} from '/both/imports/collections';
import { createGeometry } from '/server/imports/db/geometries/create';
import { createCalculation } from '/server/imports/db/calculations/create';
import { runCalculation } from '/server/imports/db/calculations/update';
import {
  pingLayerRunning,
  markLayerCompleted,
} from '/server/imports/db/layers/update';

const timeBeforeRetry = 5 * 60 * 1000;

const saveCalculationResultsToLayer = ({ request, layer }) => {
  if (layer.output.calculationId) {
    const { parameters, properties, geometryIds } = Calculations.findOne(
      layer.output.calculationId
    );
    switch (parameters.type) {
      case 'groundState':
        Layers.update(layer._id, {
          $set: {
            'output.energy': properties.energy,
            'output.force': properties.force,
            'output.geometryId': geometryIds[0],
          },
        });
        break;
      case 'geometryOptimization':
        Layers.update(layer._id, {
          $set: {
            'output.energy':
              properties.energies[properties.energies.length - 1],
            'output.geometryId': createGeometry({
              xyz: properties.geometries[properties.geometries.length - 1],
              userId: request.userId,
            }),
          },
        });
        break;
      case 'conformerSearch':
        Layers.update(layer._id, {
          $set: {
            'output.[energy]': properties.energies,
            'output.[geometryId]': properties.geometries.map(geometry =>
              createGeometry({ xyz: geometry, userId: request.userId })
            ),
          },
        });
        break;
      case 'harmonicSpectra':
        Layers.update(layer._id, {
          $set: {
            'output.[frequency]': properties.frequencies,
            'output.[intensity]': properties.intensities,
            'output.freeEnergy': properties.freeEnergy['300K1ATM'],
            'output.geometryId': geometryIds[0],
          },
        });
        break;
    }
  } else if (layer.output['[calculationId]']) {
    const calculations = Calculations.find({
      _id: { $in: layer.output['[calculationId]'] },
    });
    calculations.forEach(calculation => {
      const { parameters, properties, geometryIds } = calculation;
      switch (parameters.type) {
        case 'groundState':
          Layers.update(layer._id, {
            $push: {
              'output.[energy]': properties.energy,
              'output.[force]': properties.force,
              'output.[geometryId]': geometryIds[0],
            },
          });
          break;
        case 'geometryOptimization':
          Layers.update(layer._id, {
            $push: {
              'output.[energy]':
                properties.energies[properties.energies.length - 1],
              'output.[geometryId]': createGeometry({
                xyz: properties.geometries[properties.geometries.length - 1],
                userId: request.userId,
              }),
            },
          });
          break;
        case 'conformerSearch':
          Layers.update(layer._id, {
            $push: {
              'output.[[energy]]': properties.energies,
              'output.[[geometryId]]': properties.geometries.map(geometry =>
                createGeometry({ xyz: geometry, userId: request.userId })
              ),
            },
          });
          break;
        case 'harmonicSpectra':
          Layers.update(layer._id, {
            $push: {
              'output.[[frequency]]': properties.frequencies,
              'output.[[intensity]]': properties.intensities,
              'output.[freeEnergy]': properties.freeEnergy['300K1ATM'],
              'output.[geometryId]': geometryIds[0],
            },
          });
          break;
      }
    });
  }
};

const runLayer = ({ request, layer }) => {
  const updates = {};
  if (!request.startedAt) {
    updates.startedAt = moment().valueOf();
  }
  if (!request.updatedAt) {
    updates.updatedAt = moment().valueOf();
  }
  if (!request.running) {
    updates.running = true;
  }
  if (Object.keys(updates).length !== 0) {
    Requests.update(request._id, { $set: updates });
  }
  const previousLayer = Layers.findOne(layer.input.layerId) || {};
  previousLayer.output = previousLayer.output ? previousLayer.output : {};

  switch (layer.type) {
    case 'calculation':
      const geometryId = previousLayer.output.geometryId
        ? previousLayer.output.geometryId
        : layer.input.geometryIds && layer.input.geometryIds.length === 1
          ? layer.input.geometryIds[0]
          : null;
      const geometryId_ = previousLayer.output['[geometryId]']
        ? previousLayer.output['[geometryId]']
        : layer.input.geometryIds && layer.input.geometryIds.length > 1
          ? layer.geometryIds
          : null;
      // TODO: Handle when a single calculation can accept an array of geometries
      if (geometryId) {
        const calculationId = createCalculation({
          geometryIds: [geometryId],
          parameters: layer.parameters,
          userId: request.userId,
          explicit: false,
        });
        runCalculation({
          calculationId,
          userId: request.userId,
          clusterId: request.clusterId,
        });
        Layers.update(layer._id, {
          $set: { 'output.calculationId': calculationId },
        });
      }
      if (geometryId_) {
        geometryId_.forEach(geometryId => {
          const calculationId = createCalculation({
            geometryIds: [geometryId],
            parameters: layer.parameters,
            userId: request.userId,
            explicit: false,
          });
          runCalculation({
            calculationId,
            userId: request.userId,
            clusterId: request.clusterId,
          });
          Layers.update(layer._id, {
            $addToSet: { 'output.[calculationId]': calculationId },
          });
        });
      }
      // Wait for calculations to finish and update request and layer
      const updatedLayer = Layers.findOne(layer._id);
      const calculationIds = updatedLayer.output.calculationId
        ? [updatedLayer.output.calculationId]
        : updatedLayer.output['[calculationId]'];
      const calculationWatcher = Requests.find({
        calculationId: { $in: calculationIds },
      }).observe({
        added: calculationRequest => {
          if (
            calculationIds.length ===
            Requests.find({
              calculationId: { $in: calculationIds },
              completed: true,
            }).count()
          ) {
            console.log('All calculations finished for layer...');
            saveCalculationResultsToLayer({ request, layer: updatedLayer });
            markLayerCompleted({ layerId: updatedLayer._id });
            calculationWatcher.stop();
          }
        },
        changed: (newCalculationRequest, oldCalculationRequest) => {
          if (
            newCalculationRequest.updatedAt !== oldCalculationRequest.updatedAt
          ) {
            pingLayerRunning({ layerId: updatedLayer._id });
          }
          if (
            calculationIds.length ===
            Requests.find({
              calculationId: { $in: calculationIds },
              completed: true,
            }).count()
          ) {
            console.log('All calculations finished for layer...');
            saveCalculationResultsToLayer({
              request: newCalculationRequest,
              layer: updatedLayer,
            });
            markLayerCompleted({ layerId: updatedLayer._id });
            calculationWatcher.stop();
          }
        },
      });
      // switch (layer.parameters.type) {
      //   case ''
      // }
      break;
    case 'limit':
      break;
    case 'sort':
      break;
    case 'unique':
      break;
    case 'flatten':
      break;
  }
  // switch for layer type
  // create calculations and observe them
};

// TODO: User Calculation Limits and Checks
const layerWatcher = {
  watchInterval: null,
  observers: [],
  start: () => {
    // observe to catch most layers quickly
    layerWatcher.observers.push(
      Requests.find(
        { type: 'layer', completed: { $ne: true } },
        { limit: 100, sort: { createdAt: -1 } }
      ).observe({
        added: request => {
          // console.log('Request added, checking...');
          const layer = Layers.findOne(request.layerId);
          if (layer.input.geometryIds) {
            // Run the layer
            runLayer({ request, layer });
          } else if (layer.input.layerId) {
            // Add observer to that layer and wait for it to finish
            let previousLayerWatcher;
            previousLayerWatcher = Requests.find({
              layerId: layer.input.layerId,
              completed: true,
            }).observe({
              added: previousLayerRequest => {
                if (previousLayerRequest.completed) {
                  runLayer({ request, layer });
                  setTimeout(() => previousLayerWatcher.stop(), 100);
                }
              },
            });
          }
          // Watch layers for changes
          // const layerWatcher = Requests.find({
          //   _id: { $in: layer.layerIds },
          //   type: 'layer',
          // }).observe({
          //   changed: (newRequest, oldRequest) => {
          //     console.log('LayerWatcher: LAYER UPDATED!!!');
          //     // If a layer is updated, mark the layer as updated
          //     if (newRequest.updatedAt !== oldRequest.updatedAt) {
          //       pingLayerRunning({ layerId: layer._id });
          //     }
          //     // If a layer errors out, mark layer as errored
          //     if (newRequest.error && !Layers.findOne(request.layerId).error) {
          //       Layers.update(layer._id, {
          //         $set: { error: newRequest.error },
          //       });
          //     }
          //     // If all layers completed, mark layer as completed
          //     if (
          //       newRequest.completed &&
          //       Requests.find({
          //         _id: { $in: layer.layerIds },
          //         completed: true,
          //       }).count() === layer.layerIds.length
          //     ) {
          //       markLayerCompleted({ layerId: layer._id });
          //       layerWatcher.stop();
          //     }
          //   },
          // });
          // layerWatcher.checkCalculation({ layer, request });
          // layerWatcher.addToUserResults({ layer, request });
        },
      })
    );
  },
  stop: () => {
    layerWatcher.observers.forEach(observer => observer.stop());
    clearInterval(layerWatcher.watchInterval);
  },
};

export { layerWatcher };
