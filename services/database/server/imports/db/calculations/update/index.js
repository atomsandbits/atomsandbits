import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import logger from '/both/imports/logger';
import { Calculations, Clusters, Requests } from '/both/imports/collections';

const addUserToCalculation = ({
  calculationId = isRequired('calculationId'),
  userId = isRequired('userId'),
  explicit,
}) => {
  const calculationWithUser = Calculations.findOne(
    {
      _id: calculationId,
      'users._id': userId,
    },
    { fields: { _id: 1 } }
  );
  if (calculationWithUser) {
    if (explicit) {
      Calculations.update(
        { _id: calculationId, 'users._id': userId },
        {
          $set: {
            'users.$.explicit': true,
          },
        }
      );
    }
    return 1;
  }
  const user = {
    _id: userId,
    createdAt: moment().valueOf(),
  };
  if (explicit) {
    user.explicit = true;
  }
  return Calculations.update(calculationId, {
    $push: {
      users: user,
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
    { fields: { _id: 1 } }
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
  // TODO: Allow forcing a calculation to re-run
  const previousRequest = Requests.findOne({
    type: 'calculation',
    calculationId,
    completed: true,
  });
  const createdAt = moment().valueOf();
  return Requests.insert({
    type: 'calculation',
    calculationId,
    userId,
    clusterId: cluster._id,
    completed: previousRequest && previousRequest.completed ? true : undefined,
    completedAt:
      previousRequest && previousRequest.completedAt ? createdAt : undefined,
    running: (previousRequest && previousRequest.running) || false,
    createdAt,
  });
};

const setCalculationRunning = ({ calculationId }) =>
  Requests.update(
    { calculationId, completed: { $ne: true }, running: { $ne: true } },
    { $set: { startedAt: moment().valueOf(), running: true } },
    { multi: true }
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
    { multi: true }
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
    { fields: { _id: 1 } }
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
  properties,
  output,
  error,
}) =>
  Calculations.update(calculationId, {
    $set: {
      properties,
      output,
      error,
    },
  });

const saveCalculationResult = ({
  calculationId = isRequired('calculationdId'),
  properties = isRequired('properties'),
  output,
  error,
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
    { multi: true }
  );
  return Calculations.update(calculationId, {
    $set: {
      properties,
      output,
      error,
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
