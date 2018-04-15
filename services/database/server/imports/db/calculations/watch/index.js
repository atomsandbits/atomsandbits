import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import {
  Calculations,
  Clusters,
  Requests,
  UserResults,
} from '/both/imports/collections';
import { runCalculation } from '/server/imports/api/events/run-calculation';

const timeBeforeRetry = 5 * 60 * 1000;

// TODO: User Calculation Limits and Checks
const calculationWatcher = {
  watchInterval: null,
  observers: [],
  start: () => {
    // observe to catch most calculations quickly
    calculationWatcher.observers.push(
      Requests.find({}, { limit: 100, sort: { createdAt: -1 } }).observe({
        added: request => {
          console.log('Request added, checking...');
          const calculation = Calculations.findOne(request.calculationId);
          calculationWatcher.checkCalculation({ calculation, request });
          calculationWatcher.addToUserResults({ calculation, request });
        },
        // changed: newRequest => {
        //   const request = newRequest;
        //   const calculation = Calculations.findOne(request.calculationId);
        //   calculationWatcher.checkCalculation({ calculation, request });
        // },
      })
    );
    // poll for calculations that don't go through
    calculationWatcher.watchInterval = Meteor.setInterval(() => {
      const pendingCalculationsCursor = Requests.find({
        completedAt: { $exists: false },
        $or: [
          {
            running: { $exists: false },
          },
          {
            running: false,
          },
          {
            updatedAt: {
              $lt: moment().valueOf() - timeBeforeRetry,
            },
          },
        ],
      });
      // Run Pending Calculations
      pendingCalculationsCursor.forEach(request => {
        const calculation = Calculations.findOne(request.calculationId);
        calculationWatcher.checkCalculation({ calculation, request });
        calculationWatcher.addToUserResults({ calculation, request });
      });
    }, 60000);
  },
  stop: () => {
    calculationWatcher.observers.forEach(observer => observer.stop());
    clearInterval(calculationWatcher.watchInterval);
  },
  checkCalculation: ({ calculation, request }) => {
    // TODO: handle when a new request comes in and a request is already
    //       running, stopCalculation if new cluster node size is bigger
    //       else just mark the request as running
    if (
      !request.completed &&
      (!request.running ||
        request.updatedAt < moment().valueOf() - timeBeforeRetry)
    ) {
      const { serverId } = Clusters.findOne(request.clusterId);
      Requests.update(request._id, {
        $set: { running: false, startedAt: null, updatedAt: null },
      });
      // TODO: make sure this makes sense for multiple database-service nodes
      runCalculation({
        calculationId: calculation._id,
        serverId,
      });
    }
  },
  addToUserResults: ({ calculation, request }) => {
    calculation.users.forEach(user => {
      const userResult = UserResults.findOne({
        userId: user._id,
        calculationId: calculation._id,
      });
      if (user.explicit && !userResult) {
        UserResults.insert({
          userId: user._id,
          type: 'calculation',
          calculationId: calculation._id,
          createdAt: moment().valueOf(),
        });
      }
    });
  },
};

export { calculationWatcher };
