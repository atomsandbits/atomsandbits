/* eslint-env mocha */
import 'mocha';
import { expect } from 'chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import socketIOClient from 'socket.io-client';
import { Calculations } from '/both/imports/collections';
import { createTestData } from '/test/imports/create-data'; // Generate Test Data
import { runCalculation } from './index';

const PORT = 8080;
const ROOT_URL = 'http://localhost';

describe('api', () => {
  beforeEach(() => {
    resetDatabase();
  });
  describe('events', () => {
    it('expect runCalculation to emit calculations', done => {
      const { calculationId, serverId } = createTestData();
      const { program, method, type, network } = Calculations.findOne(
        calculationId,
      ).parameters;
      const socket = socketIOClient(`${ROOT_URL}:${PORT}`, {
        transports: ['websocket', 'polling'],
        query: {
          program,
          serverId,
        },
        forceNew: true,
      });
      socket.on('runCalculation', ({ calculation }) => {
        socket.disconnect();
        try {
          expect(calculation).to.deep.include({
            _id: calculationId,
            method,
            type,
            network,
          });
          done();
        } catch (err) {
          done(err);
        }
      });
      setTimeout(() => {
        runCalculation({
          serverId,
          calculationId,
        });
      }, 10);
    });
  });
});
