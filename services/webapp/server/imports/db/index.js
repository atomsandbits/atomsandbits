import { Mongo } from 'meteor/mongo';
import logger from '/both/imports/logger';

logger.info('Creating collections...');

const Calculations = new Mongo.Collection('calculations');
const Clusters = new Mongo.Collection('clusters');
const Geometries = new Mongo.Collection('geometries');
const Groups = new Mongo.Collection('groups');
const Layers = new Mongo.Collection('layers');
const Payments = new Mongo.Collection('payments');
const Projects = new Mongo.Collection('projects');
const Requests = new Mongo.Collection('requests');
const Servers = new Mongo.Collection('servers');

export {
  Calculations,
  Clusters,
  Geometries,
  Groups,
  Layers,
  Payments,
  Projects,
  Requests,
  Servers,
};
