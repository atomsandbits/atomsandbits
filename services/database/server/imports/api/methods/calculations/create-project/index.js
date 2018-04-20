import { Meteor } from 'meteor/meteor';
import logger from '/both/imports/logger';
import io from '/server/imports/socket-io';
import { createProject } from '/server/imports/db/projects/create';
import { runProject } from '/server/imports/db/projects/update';

io.on(
  'connection',
  Meteor.bindEnvironment(socket => {
    socket.on(
      'createProject',
      Meteor.bindEnvironment(
        (
          {
            userId = isRequired('userId'),
            xyzs = isRequired('xyzs'),
            layers = isRequired('layers'),
            run,
            clusterId,
          },
          callback = () => {}
        ) => {
          // TODO: REALLY NEED PARAMETER CHECKING HERE!!!
          logger.silly('API Creating Calculation...', {
            userId,
            xyzs,
            layers,
            run,
            clusterId,
          });
          if (run && !clusterId) {
            logger.warn(
              `createProject: run is ${run} and clusterId is ${clusterId}...`
            );
          }
          try {
            const projectId = createProject({
              xyzs,
              layers,
              userId,
            });
            if (run) {
              runProject({ projectId, userId, clusterId });
            }
            callback(null, {
              projectId,
              created: projectId,
              result: projectId,
            });
          } catch (error) {
            callback({ name: error.name, message: error.message });
            logger.error(`${error.name}: ${error.message}`);
          }
        }
      )
    );
  })
);
