import { Meteor } from 'meteor/meteor';

import { Calculations, Clusters, Requests } from '/both/imports/collections';
import { runCalculation } from '/server/imports/api/events/run-calculation';

// TODO: User Calculation Limits and Checks
const calculationWatcher = {
  watchInterval: null,
  observers: [],
  start: () => {
    // observe to catch most calculations quickly
    calculationWatcher.observers.push(
      Requests.find().observe({
        added: request => {
          console.log('request added!');
          const calculation = Calculations.findOne(request.calculationId);
          calculationWatcher.checkCalculation({ calculation, request });
        },
        // changed: newRequest => {
        //   const request = newRequest;
        //   const calculation = Calculations.findOne(request.calculationId);
        //   calculationWatcher.checkCalculation({ calculation, request });
        // },
      }),
    );
    // poll for calculations that don't go through
    calculationWatcher.watchInterval = Meteor.setInterval(() => {
      const pendingCalculationsCursor = Requests.find({
        completedAt: { $exists: false },
        $or: [
          {
            running: undefined,
          },
          {
            running: false,
          },
        ],
      });
      // Run Pending Calculations
      pendingCalculationsCursor.forEach(request => {
        const calculation = Calculations.findOne(request.calculationId);
        calculationWatcher.checkCalculation({ calculation, request });
      });
    }, 5000);
  },
  stop: () => {
    calculationWatcher.observers.forEach(observer => observer.stop());
    clearInterval(calculationWatcher.watchInterval);
  },
  checkCalculation: ({ calculation, request }) => {
    // TODO: handle when a new request comes in and a request is already
    //       running, stopCalculation if new cluster node size is bigger
    //       else just mark the request as running
    if (!request.running) {
      const { serverId } = Clusters.findOne(request.clusterId);
      // TODO: make sure this makes sense for multiple database-service nodes
      runCalculation({
        calculationId: calculation._id,
        serverId,
      });
    }
  },
};

export { calculationWatcher };
