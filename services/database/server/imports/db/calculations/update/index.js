import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import logger from '/both/imports/logger';
import { Calculations, Clusters, Requests } from '/both/imports/collections';

const addUserToCalculation = ({
  calculationId = isRequired('calculationId'),
  userId = isRequired('userId'),
}) => {
  const calculationWithUser = Calculations.findOne(
    {
      _id: calculationId,
      'users._id': userId,
    },
    { fields: { _id: 1 } },
  );
  if (calculationWithUser) {
    return 1;
  }
  return Calculations.update(calculationId, {
    $push: {
      users: {
        _id: userId,
        createdAt: moment().valueOf(),
      },
    },
  });
};

const runCalculation = ({
  calculationId = isRequired('calculationId'),
  userId = isRequired('userId'),
  clusterId,
}) => {
  // Make sure request doesn't exist already
  const existingRequest = Requests.findOne(
    {
      calculationId,
      userId,
      type: 'calculation',
    },
    { fields: { _id: 1 } },
  );
  if (existingRequest) {
    return existingRequest._id;
  }
  let cluster;
  if (!clusterId) {
    const { defaultClusterId } = Meteor.users.findOne(userId, {
      fields: { 'profile.settings': 1 },
    }).profile.settings;
    cluster = Clusters.findOne(defaultClusterId || 'free');
  } else {
    cluster = Clusters.findOne(clusterId, { fields: { _id: 1 } });
  }
  if (!cluster) {
    throw new Error('runCalculation: cluster not defined');
  }
  // TODO: Check that the User has access to this cluster
  return Requests.insert({
    type: 'calculation',
    calculationId,
    userId,
    clusterId: cluster._id,
    completed: false,
    running: false,
    createdAt: moment().valueOf(),
  });
};

const setCalculationRunning = ({ calculationId }) =>
  Requests.update(
    { calculationId, running: { $ne: true } },
    { $set: { startedAt: moment().valueOf(), running: true } },
  );

const pingCalculationRunning = ({
  calculationId = isRequired('calculationId'),
}) =>
  Requests.update(
    { calculationId },
    {
      $set: {
        updatedAt: moment().valueOf(),
      },
    },
  );

const stopCalculation = ({
  calculationId = isRequired('calculationId'),
  userId = isRequired('userId'),
}) => {
  // TODO: Allow users to delete requests when they are an admin for the cluster
  const request = Requests.findOne(
    {
      calculationId,
      userId,
      type: 'calculation',
      completed: { $ne: true },
    },
    { fields: { _id: 1 } },
  );
  if (!request) {
    logger.silly('stopCalculation: request not found', {
      calculationId,
      userId,
    });
    return 0;
  }
  return Requests.remove(request._id);
};

const saveIntermediateCalculationResult = ({
  calculationId = isRequired('calculationdId'),
  properties = isRequired('properties'),
  output,
}) =>
  Calculations.update(calculationId, {
    $set: {
      properties,
      output,
    },
  });

const saveCalculationResult = ({
  calculationId = isRequired('calculationdId'),
  properties = isRequired('properties'),
  output,
}) => {
  Requests.update(
    {
      calculationId,
      type: 'calculation',
    },
    {
      $set: {
        running: false,
        completed: true,
        completedAt: moment().valueOf(),
      },
    },
  );
  return Calculations.update(calculationId, {
    $set: {
      properties,
      output,
    },
  });
};

export {
  addUserToCalculation,
  runCalculation,
  setCalculationRunning,
  pingCalculationRunning,
  stopCalculation,
  saveIntermediateCalculationResult,
  saveCalculationResult,
};
export default {
  addUserToCalculation,
  runCalculation,
  setCalculationRunning,
  pingCalculationRunning,
  stopCalculation,
  saveIntermediateCalculationResult,
  saveCalculationResult,
};