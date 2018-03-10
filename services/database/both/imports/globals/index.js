import { Meteor } from 'meteor/meteor';
import logger from '/both/imports/logger';

if (Meteor.isServer) {
  global.isRequired = parameter => {
    // logger.error(`${parameter} is required...`)
    throw new Error(`${parameter} is required...`);
  };
} else {
  window.isRequired = parameter => {
    // logger.error(`${parameter} is required...`);
    throw new Error(`${parameter} is required...`);
  };
}
