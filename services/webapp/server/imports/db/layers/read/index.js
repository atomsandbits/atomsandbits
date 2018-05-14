// import { Meteor } from 'meteor/meteor';
// import _ from 'lodash';
// import moment from 'moment';
// import elasticsearch from 'elasticsearch';
// import xyzTools from '/both/imports/tools/xyz';
import { Layers, Requests } from '/server/imports/db';

const convertLayerToGraph = ({ layerId, layer, userId }) => {
  if (!layer) {
    layer = Layers.findOne(layerId);
  }
  if (!layerId) {
    layerId = layer._id;
  }
  const request =
    Requests.findOne(
      { layerId }
      // { sortBy: { createdAt: -1 } }
    ) || {};
  // console.log(request);
  if (!layer) {
    throw new Error('Calculation not found.');
  }
  const { completed, completedAt, createdAt, running, startedAt } = request;
  const { error, geometryIds, _id, layerIds, type, parameters, output } = layer;
  return {
    // runTime: moment(lastRun.startedAt).diff(lastRun.completedAt),
    completed: Boolean(completed),
    completedAt,
    createdAt,
    error: Boolean(error),
    errorMessage: error ? error.message : null,
    geometryIds,
    id: _id,
    layerIds,
    output,
    parameters:
      type === 'calculation'
        ? {
            calculation: parameters,
          }
        : parameters,
    running: Boolean(running),
    startedAt,
    type: type.toUpperCase(),
  };
};

const getLayer = ({ layerId, userId }) => {
  return convertLayerToGraph({ layerId, userId });
};

const getLayers = ({ geometryId, layerIds, userId }) => {
  let layers;
  if (layerIds) {
    layers = Layers.find(
      { _id: { $in: layerIds } },
      { sort: { createdAt: 1 } }
    ).fetch();
  } else if (geometryId) {
    layers = Layers.find({ geometryIds: geometryId }).fetch();
  }
  return layers.map((layer) => {
    return convertLayerToGraph({ layer, userId });
  });
};

export { convertLayerToGraph, getLayer, getLayers };
