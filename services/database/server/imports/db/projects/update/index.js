import { Meteor } from 'meteor/meteor';
import moment from 'moment';
// import logger from '/both/imports/logger';
import { Clusters, Requests, Projects } from '/both/imports/collections';
import { runLayer } from '/server/imports/db/layers/update';

const runProject = ({
  projectId = isRequired('projectId'),
  userId = isRequired('userId'),
  clusterId,
}) => {
  // Make sure request doesn't exist already
  const project = Projects.findOne(projectId);
  const existingRequest = Requests.findOne(
    {
      projectId,
      userId,
      type: 'project',
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
    throw new Error('runProject: cluster not defined');
  }
  // TODO: Check that the User has access to this cluster
  // TODO: Allow forcing a calculation to re-run
  const previousRequest = Requests.findOne({
    type: 'project',
    projectId,
    completed: true,
  });
  // Requests.update(
  //   { projectId, running: { $ne: true } },
  //   { $set: { startedAt: moment().valueOf(), running: true } },
  //   { multi: true }
  // );
  const createdAt = moment().valueOf();
  const requestInserted = Requests.insert({
    type: 'project',
    projectId,
    userId,
    clusterId: cluster._id,
    completed: previousRequest && previousRequest.completed ? true : undefined,
    completedAt:
      previousRequest && previousRequest.completedAt ? createdAt : undefined,
    running: (previousRequest && previousRequest.running) || false,
    createdAt,
  });
  project.layerIds.forEach((layerId) =>
    runLayer({ layerId, clusterId: cluster._id, userId })
  );

  return requestInserted;
};

const pingProjectRunning = ({ projectId = isRequired('projectId') }) =>
  Requests.update(
    { projectId },
    {
      $set: {
        updatedAt: moment().valueOf(),
      },
    }
  );

const markProjectCompleted = ({ projectId = isRequired('projectId') }) => {
  return Requests.update(
    {
      projectId,
      type: 'project',
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

export { runProject, pingProjectRunning, markProjectCompleted };
export default {
  runProject,
  pingProjectRunning,
  markProjectCompleted,
};
