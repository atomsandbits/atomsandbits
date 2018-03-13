/* eslint-env mocha */
import 'mocha';
import { expect } from 'chai';
import { Meteor } from 'meteor/meteor';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import '/both/imports/globals';
import { createTestData } from '/test/imports/create-data';
import { createCalculation } from './index';

describe('database', () => {
  beforeEach(() => {
    resetDatabase();
  });
  describe('create calculation methods', () => {
    it('expect createCalculation to error if userId is not defined', () => {
      expect(() => {
        createCalculation({ parameters: {} });
      }).to.throw();
    });
    it('expect createCalculation to error if geometry is not defined', () => {
      expect(() => {
        createCalculation({ parameters: {}, userId: 'abc123' });
      }).to.throw();
    });
    it('expect createCalculation to return a new calculationId', () => {
      const { userId } = createTestData();
      const calculationId = createCalculation({
        parameters: {},
        userId,
        xyzs: ['H 0 0 0'],
      });
      expect(calculationId).to.be.a('string');
    });
    it('expect createCalculation to return an existing calculationId', () => {
      const { userId } = createTestData();
      const calculationOptions = {
        parameters: {},
        userId,
        xyzs: ['H 0 0 0'],
      };
      const calculationId = createCalculation(calculationOptions);
      const sameCalculationId = createCalculation(calculationOptions);
      expect(calculationId).to.equal(sameCalculationId);
    });
  });
});
