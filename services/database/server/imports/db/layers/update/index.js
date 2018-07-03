import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import logger from '/both/imports/logger';
import {
  Calculations,
  Clusters,
  Requests,
  Layers,
} from '/both/imports/collections';

const addUserToLayer = ({
  layerId = isRequired('layerId'),
  userId = isRequired('userId'),
}) => {
  const layerWithUser = Layers.findOne(
    {
      _id: layerId,
      'users._id': userId,
    },
    { fields: { _id: 1 } }
  );
  if (layerWithUser) {
    return 1;
  }
  const user = {
    _id: userId,
    createdAt: moment().valueOf(),
  };
  return Layers.update(layerId, {
    $push: {
      users: user,
    },
  });
};

const runLayer = ({
  layerId = isRequired('layerId'),
  userId = isRequired('userId'),
  clusterId,
}) => {
  // Make sure request doesn't exist already
  const existingRequest = Requests.findOne(
    {
      layerId,
      userId,
      type: 'layer',
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
    throw new Error('runLayer: cluster not defined');
  }
  // TODO: Check that the User has access to this cluster
  // TODO: Allow forcing a calculation to re-run
  const previousRequest = Requests.findOne({
    type: 'layer',
    layerId,
    completed: true,
  });
  // Requests.update(
  //   { layerId, running: { $ne: true } },
  //   { $set: { startedAt: moment().valueOf(), running: true } },
  //   { multi: true }
  // );
  const createdAt = moment().valueOf();
  return Requests.insert({
    type: 'layer',
    layerId,
    userId,
    clusterId: cluster._id,
    completed: previousRequest && previousRequest.completed ? true : undefined,
    completedAt:
      previousRequest && previousRequest.completedAt ? createdAt : undefined,
    running: (previousRequest && previousRequest.running) || false,
    createdAt,
  });
};

const pingLayerRunning = ({ layerId = isRequired('layerId') }) =>
  Requests.update(
    { layerId },
    {
      $set: {
        updatedAt: moment().valueOf(),
      },
    },
    { multi: true }
  );

const stopLayer = ({
  layerId = isRequired('layerId'),
  userId = isRequired('userId'),
}) => {
  // TODO: Allow users to delete requests when they are an admin for the cluster
  const request = Requests.findOne(
    {
      layerId,
      userId,
      type: 'calculation',
      completed: { $ne: true },
    },
    { fields: { _id: 1 } }
  );
  if (!request) {
    logger.silly('stopLayer: request not found', {
      layerId,
      userId,
    });
    return 0;
  }
  return Requests.remove(request._id);
};

const saveIntermediateLayerResult = ({
  layerId = isRequired('calculationdId'),
  properties,
  output,
  error,
}) =>
  Calculations.update(layerId, {
    // $set: {
    //   properties,
    //   output,
    //   error,
    // },
  });

const saveLayerResult = ({
  layerId = isRequired('calculationdId'),
  properties = isRequired('properties'),
  output,
  error,
}) => {
  // Requests.update(
  //   {
  //     layerId,
  //     type: 'calculation',
  //   },
  //   {
  //     $set: {
  //       running: false,
  //       completed: true,
  //       completedAt: moment().valueOf(),
  //     },
  //   },
  //   { multi: true }
  // );
  // return Calculations.update(layerId, {
  //   $set: {
  //     properties,
  //     output,
  //     error,
  //   },
  // });
};

const markLayerCompleted = ({ layerId = isRequired('layerId') }) => {
  return Requests.update(
    {
      layerId,
      type: 'layer',
    },
    {
      $set: {
        running: false,
        completed: true,
        completedAt: moment().valueOf(),
      },
    }
  );
};

export {
  addUserToLayer,
  runLayer,
  pingLayerRunning,
  stopLayer,
  saveIntermediateLayerResult,
  saveLayerResult,
  markLayerCompleted,
};
export default {
  addUserToLayer,
  runLayer,
  pingLayerRunning,
  stopLayer,
  saveIntermediateLayerResult,
  saveLayerResult,
  markLayerCompleted,
};
