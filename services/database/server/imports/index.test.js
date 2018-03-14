/* eslint-env mocha */
import 'mocha';
import { expect } from 'chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Meteor } from 'meteor/meteor';
import socketIOClient from 'socket.io-client';
import { Calculations, Requests } from '/both/imports/collections';
import { createTestData } from '/test/imports/create-data';
import { calculationWatcher } from '/server/imports/db/calculations/watch'; // load watchers and maintainers

const TIMEOUT = 15000;
const PORT = 8080;
const ROOT_URL = 'http://localhost';

// TODO: add neb and conformer search tests
// TODO: What will the input for Neb look like? 
describe('integration', () => {
  beforeEach(() => {
    resetDatabase();
  });
  afterEach(() => {
    calculationWatcher.stop();
  });
  describe('calculations', () => {
    if (process.env.TENSORMOL_SERVICE) {
      describe('tensormol', () => {
        it('expect energy and force', done => {
          calculationWatcher.start();
          const {
            calculationId,
            serverId,
            userId,
            clusterId,
          } = createTestData();
          const { parameters } = Calculations.findOne(calculationId);
          const socket = socketIOClient(`${ROOT_URL}:${PORT}`, {
            transports: ['websocket', 'polling'],
            query: {
              program: parameters.program,
              serverId,
            },
            forceNew: true,
          });
          socket.emit(
            'createCalculation',
            {
              xyzs: ['H 0 0 0'],
              clusterId,
              parameters,
              run: true,
              userId,
            },
            Meteor.bindEnvironment((error, data) => {
              const newCalculationId = data.calculationId;
              Requests.find({
                calculationId: newCalculationId,
                completedAt: { $exists: true },
              }).observe({
                added: request => {
                  console.log(request);
                  console.log(
                    'Calculation Time: ',
                    request.completedAt - request.startedAt,
                    'ms',
                  );
                  const calculation = Calculations.findOne(newCalculationId);
                  socket.disconnect();
                  try {
                    expect(calculation.properties.energy).to.equal(
                      -0.06803810242176071,
                    );
                    done();
                  } catch (err) {
                    done(err);
                  }
                },
              });
            }),
          );
        }).timeout(TIMEOUT);
        it('expect optimized geometry', done => {
          // return done();
          calculationWatcher.start();
          const {
            calculationId,
            serverId,
            userId,
            clusterId,
          } = createTestData();
          const { parameters } = Calculations.findOne(calculationId);
          parameters.type = 'geometryOptimization';
          const socket = socketIOClient(`${ROOT_URL}:${PORT}`, {
            transports: ['websocket', 'polling'],
            query: {
              program: parameters.program,
              serverId,
            },
            forceNew: true,
          });
          socket.emit(
            'createCalculation',
            {
              xyzs: ['H 0 0 0\nH 0 0 1'],
              clusterId,
              parameters,
              run: true,
              userId,
            },
            Meteor.bindEnvironment((error, data) => {
              const newCalculationId = data.calculationId;
              Requests.find({
                calculationId: newCalculationId,
                completedAt: { $exists: true },
              }).observe({
                added: request => {
                  console.log(request);
                  console.log(
                    'Calculation Time: ',
                    request.completedAt - request.startedAt,
                  );
                  const calculation = Calculations.findOne(newCalculationId);
                  socket.disconnect();
                  try {
                    expect(calculation.properties.geometries[0]).to.equal(
                      'H   0.0  0.0  0.1251959239468133\nH   0.0  0.0  0.8748040760531867',
                    );
                    done();
                  } catch (err) {
                    done(err);
                  }
                },
              });
            }),
          );
        }).timeout(TIMEOUT);
      });
    }
  });
});
