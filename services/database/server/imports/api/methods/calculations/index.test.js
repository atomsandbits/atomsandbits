/* eslint-env mocha */
import 'mocha';
import { expect } from 'chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import socketIOClient from 'socket.io-client';
import { Calculations } from '/both/imports/collections';
import { createTestData } from '/test/imports/create-data';
import './index'; // start server listeners

const PORT = 8080;
const ROOT_URL = 'http://localhost';

describe('api', () => {
  beforeEach(() => {
    resetDatabase();
  });
  describe('methods', () => {
    it('expect createCalculation to save the calculation', done => {
      const { calculationId, serverId, userId } = createTestData();
      const { parameters } = Calculations.findOne(calculationId);
      const socket = socketIOClient(`${ROOT_URL}:${PORT}`, {
        transports: ['websocket', 'polling'],
        query: {
          program: parameters.program,
          serverId,
        },
      });
      socket.emit(
        'createCalculation',
        {
          userId,
          xyzs: ['H 0 0 0'],
          parameters,
        },
        (error, data) => {
          socket.disconnect();
          try {
            expect(data.calculationId).to.be.a('string');
            done();
          } catch (err) {
            done(err);
          }
        },
      );
    });
    it('expect createCalculation to return existing calculation', done => {
      const { calculationId, serverId, userId } = createTestData();
      const { parameters } = Calculations.findOne(calculationId);
      const socket = socketIOClient(`${ROOT_URL}:${PORT}`, {
        transports: ['websocket', 'polling'],
        query: {
          program: parameters.program,
          serverId,
        },
      });
      socket.emit(
        'createCalculation',
        {
          userId,
          xyzs: ['H 0 0 0'],
          parameters,
        },
        (error, data) => {
          socket.emit(
            'createCalculation',
            {
              userId,
              xyzs: ['H 0 0 0'],
              parameters,
            },
            (error2, data2) => {
              socket.disconnect();
              try {
                expect(data2.calculationId).to.equal(data.calculationId);
                done();
              } catch (err) {
                done(err);
              }
            },
          );
        },
      );
    });
    it('expect setCalculationRunning to set calculation running', done => {
      const { calculationId, serverId, userId, clusterId } = createTestData();
      const { parameters } = Calculations.findOne(calculationId);
      const socket = socketIOClient(`${ROOT_URL}:${PORT}`, {
        transports: ['websocket', 'polling'],
        query: {
          program: parameters.program,
          serverId,
        },
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
        (error, data) => {
          const newCalculationId = data.calculationId;
          socket.emit(
            'setCalculationRunning',
            {
              calculationId: newCalculationId,
            },
            (error2, data2) => {
              socket.disconnect();
              try {
                expect(data2.updated).to.equal(true);
                done();
              } catch (err) {
                done(err);
              }
            },
          );
        },
      );
    });
    it('expect setCalculationRunning to return false if already running', done => {
      const { calculationId, serverId, userId, clusterId } = createTestData();
      const { parameters } = Calculations.findOne(calculationId);
      const socket = socketIOClient(`${ROOT_URL}:${PORT}`, {
        transports: ['websocket', 'polling'],
        query: {
          program: parameters.program,
          serverId,
        },
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
        (error, data) => {
          const newCalculationId = data.calculationId;
          socket.emit(
            'setCalculationRunning',
            {
              calculationId: newCalculationId,
            },
            (error2, data2) => {
              socket.emit(
                'setCalculationRunning',
                {
                  calculationId: newCalculationId,
                },
                (error3, data3) => {
                  socket.disconnect();
                  try {
                    expect(data3.updated).to.equal(false);
                    done();
                  } catch (err) {
                    done(err);
                  }
                },
              );
            },
          );
        },
      );
    });
    // TODO: add the rest of the tests and split into files
  });
});
