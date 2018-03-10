/* eslint-env mocha */
import chai from 'chai';
import { Calculations, Clusters, Geometries, Groups, Payments, Projects, Servers } from './index';

describe('create collections', () => {
  it('collections should exist', () => {
    chai.should();
    Calculations.should.be.an('object');
    Clusters.should.be.an('object');
    Geometries.should.be.an('object');
    Groups.should.be.an('object');
    Payments.should.be.an('object');
    Projects.should.be.an('object');
    Servers.should.be.an('object');
  });
});
