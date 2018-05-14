import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import { Calculations } from '/both/imports/db';
import { resetCalculation } from '/server/imports/tools/reset-calculation';

// TODO:
// add method to rerun "running" calculations that
// haven't started for some time and other failures

// TODO:
// check this function
const calculationMaintainer = {
  start: () => {
    // rerun calculations with no output after 5 minutes
    Meteor.setInterval(() => {
      let unprocessedCalculations = Calculations.find({
        runs: {
          submittedAt: {
            $exists: true,
          },
          startedAt: {
            $exists: false,
          },
        },
      });
      // Run Pending Calculations
      unprocessedCalculations.forEach((calculation) => {
        console.log(`Unprocessed: Calculation ${calculation._id}...`);
        const runs = calculation.runs.length;
        const submittedAt = moment(calculation.runs[runs - 1].submittedAt);
        const currentTime = moment();
        const timeDiff = currentTime.diff(submittedAt, 'ms');
        if (timeDiff > 5 * 60 * 1000) {
          resetCalculation(calculation._id);
        }
      });
    }, 60 * 1000);
  },
};

export { calculationMaintainer };
