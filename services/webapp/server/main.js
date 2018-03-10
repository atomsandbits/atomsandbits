import { Meteor } from 'meteor/meteor';
import '/server/imports/config';
import '/server/imports/api';
import { Calculations, Geometries } from '/server/imports/db';

Meteor.startup(() => {});

// Meteor.methods({
//   'resetDatabase': () => {
//     console.log("Resetting Database...")
//     console.log("Calculations Removed: " + Calculations.remove({}));
//     console.log("Geometries Removed: " + Geometries.remove({}));
//     console.log("Running Calculations Removed: " + RunningCalculations.remove({}));
//   }
// });
