/* eslint-env mocha */
import 'mocha';
import { expect } from 'chai';
import { Meteor } from 'meteor/meteor';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import '/both/imports/globals';
import { Calculations, Requests } from '/both/imports/collections';
import { createTestData } from '/test/imports/create-data';
import {
  addUserToCalculation,
  runCalculation,
  setCalculationRunning,
  pingCalculationRunning,
  stopCalculation,
  saveCalculationResult,
  saveIntermediateCalculationResult,
} from './index';
// import { createCalculation } from '../create/index';

describe('database', () => {
  beforeEach(() => {
    resetDatabase();
  });
  describe('update calculation methods', () => {
    it('expect addUserToCalculation to add a user to an existing calculation', () => {
      const { calculationId, userId } = createTestData();
      const calculationUpdated = addUserToCalculation({
        calculationId,
        userId,
      });
      expect(calculationUpdated).to.equal(1);
    });
    it('expect runCalculation to create a request', () => {
      const { calculationId, userId, clusterId } = createTestData();
      const requestId = runCalculation({
        userId,
        calculationId,
        clusterId,
      });
      const request = Requests.findOne(requestId);
      expect(request).to.include({
        type: 'calculation',
        calculationId,
        userId,
        clusterId,
      });
    });
    it('expect setCalculationRunning to set running to true', () => {
      const { calculationId, userId } = createTestData();
      const requestId = runCalculation({
        userId,
        calculationId,
      });
      setCalculationRunning({ calculationId });
      const request = Requests.findOne(requestId);
      expect(request.running).to.equal(true);
    });
    it('expect setCalculationRunning to not work twice', () => {
      const { calculationId, userId } = createTestData();
      runCalculation({
        userId,
        calculationId,
      });
      setCalculationRunning({ calculationId });
      const calculationUpdated = setCalculationRunning({ calculationId });
      expect(calculationUpdated).to.equal(0);
    });
    it('expect pingCalculationRunning to set updatedAt', () => {
      const { calculationId, userId } = createTestData();
      const requestId = runCalculation({
        userId,
        calculationId,
      });
      setCalculationRunning({ calculationId });
      pingCalculationRunning({ calculationId });
      const request = Requests.findOne(requestId);
      return expect(request.updatedAt).to.exist;
    });
    it('expect stopCalculation to remove request', () => {
      const { calculationId, userId } = createTestData();
      runCalculation({
        userId,
        calculationId,
      });
      setCalculationRunning({ calculationId });
      pingCalculationRunning({ calculationId });
      const removedRequest = stopCalculation({ calculationId, userId });
      expect(removedRequest).to.equal(1);
    });
    it('expect saveIntermediateCalculationResult to save results', () => {
      const { calculationId, userId } = createTestData();
      const requestId = runCalculation({
        userId,
        calculationId,
      });
      setCalculationRunning({ calculationId });
      pingCalculationRunning({ calculationId });
      saveIntermediateCalculationResult({
        calculationId,
        properties: { energy: 1.2345 },
        output: 'test',
      });
      const calculation = Calculations.findOne(calculationId);
      expect(calculation).to.deep.include({
        properties: { energy: 1.2345 },
        output: 'test',
      });
      const request = Requests.findOne(requestId);
      expect(request.completed).to.not.equal(true);
    });
    it('expect saveCalculationResult to save results and complete request', () => {
      const { calculationId, userId } = createTestData();
      const requestId = runCalculation({
        userId,
        calculationId,
      });
      setCalculationRunning({ calculationId });
      pingCalculationRunning({ calculationId });
      saveCalculationResult({
        calculationId,
        properties: { energy: 1.2345 },
        output: 'test',
      });
      const calculation = Calculations.findOne(calculationId);
      expect(calculation).to.deep.include({
        properties: { energy: 1.2345 },
        output: 'test',
      });
      const request = Requests.findOne(requestId);
      expect(request.completed).to.equal(true);
    });
    it('expect stopCalculation to not remove finished requests', () => {
      createTestData();
      const calculationId = Calculations.findOne()._id;
      const userId = Meteor.users.findOne()._id;
      runCalculation({
        userId,
        calculationId,
      });
      setCalculationRunning({ calculationId });
      pingCalculationRunning({ calculationId });
      saveCalculationResult({
        calculationId,
        properties: { energy: 1.2345 },
        output: 'test',
      });
      const removedRequest = stopCalculation({ calculationId, userId });
      expect(removedRequest).to.equal(0);
    });
  });
});
