import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import logger from '/both/imports/logger';
import { createCalculation } from '/server/imports/db/calculations/create';
import { runCalculation } from '/server/imports/db/calculations/update';

logger.info('Creating collections...');

const Calculations = new Mongo.Collection('calculations');
const Clusters = new Mongo.Collection('clusters');
const Geometries = new Mongo.Collection('geometries');
const Groups = new Mongo.Collection('groups');
const Layers = new Mongo.Collection('layers');
const Payments = new Mongo.Collection('payments');
const Projects = new Mongo.Collection('projects');
const Requests = new Mongo.Collection('requests');
const UserResults = new Mongo.Collection('user_results');
const Servers = new Mongo.Collection('servers');

const resetDatabase = () => {
  Calculations.remove({});
  Clusters.remove({});
  Geometries.remove({});
  Groups.remove({});
  Layers.remove({});
  Payments.remove({});
  Projects.remove({});
  Requests.remove({});
  UserResults.remove({});
  Servers.remove({});
  Meteor.users.remove({});
};

export {
  Calculations,
  Clusters,
  Geometries,
  Groups,
  Layers,
  Payments,
  Projects,
  Requests,
  UserResults,
  Servers,
  resetDatabase,
};
