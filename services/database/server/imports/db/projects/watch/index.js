import moment from 'moment';
import { Projects, Requests, UserResults } from '/both/imports/collections';
import {
  pingProjectRunning,
  markProjectCompleted,
} from '/server/imports/db/projects/update';

// const timeBeforeRetry = 5 * 60 * 1000;

// TODO: User Calculation Limits and Checks
const projectWatcher = {
  watchInterval: null,
  observers: [],
  start: () => {
    // observe to catch most projects quickly
    projectWatcher.observers.push(
      Requests.find(
        { type: 'project', completed: { $ne: true } },
        { limit: 100, sort: { createdAt: -1 } }
      ).observe({
        added: (request) => {
          // console.log('Request added, checking...');
          const project = Projects.findOne(request.projectId);
          const updates = {};
          if (!request.startedAt) {
            updates.startedAt = moment().valueOf();
          }
          if (!request.updatedAt) {
            updates.updatedAt = moment().valueOf();
          }
          if (!request.running) {
            updates.running = true;
          }
          if (Object.keys(updates).length !== 0) {
            Requests.update(request._id, { $set: updates });
          }
          // Watch layers for changes
          let layerWatcher;
          layerWatcher = Requests.find({
            layerId: { $in: project.layerIds },
            type: 'layer',
          }).observe({
            added: (request) => {
              // If all layers completed, mark project as completed
              if (
                request.completed &&
                Requests.find({
                  layerId: { $in: project.layerIds },
                  completed: true,
                }).count() === project.layerIds.length
              ) {
                markProjectCompleted({ projectId: project._id });
                setTimeout(() => layerWatcher.stop(), 100);
              }
            },
            changed: (newRequest, oldRequest) => {
              // If a layer is updated, mark the project as updated
              if (newRequest.updatedAt !== oldRequest.updatedAt) {
                pingProjectRunning({ projectId: project._id });
              }
              // If a layer errors out, mark project as errored
              if (
                newRequest.error &&
                !Projects.findOne(request.projectId).error
              ) {
                Projects.update(project._id, {
                  $set: { error: newRequest.error },
                });
              }
              // If all layers completed, mark project as completed
              if (
                newRequest.completed &&
                Requests.find({
                  layerId: { $in: project.layerIds },
                  completed: true,
                }).count() === project.layerIds.length
              ) {
                markProjectCompleted({ projectId: project._id });
                setTimeout(() => layerWatcher.stop(), 100);
              }
            },
          });
          // Add to UserResults
          const userResult = UserResults.findOne({
            userId: project.userId,
            projectId: project._id,
          });
          if (!userResult) {
            UserResults.insert({
              userId: project.userId,
              type: 'project',
              projectId: project._id,
              createdAt: moment().valueOf(),
            });
          }
          // projectWatcher.checkCalculation({ project, request });
          // projectWatcher.addToUserResults({ project, request });
        },
      })
    );
  },
  stop: () => {
    projectWatcher.observers.forEach((observer) => observer.stop());
    clearInterval(projectWatcher.watchInterval);
  },
};

export { projectWatcher };
