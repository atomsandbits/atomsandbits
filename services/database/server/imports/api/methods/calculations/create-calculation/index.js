import { Meteor } from 'meteor/meteor';
import logger from '/both/imports/logger';
import io from '/server/imports/socket-io';
import { createCalculation } from '/server/imports/db/calculations/create';
import { runCalculation } from '/server/imports/db/calculations/update';

io.on(
  'connection',
  Meteor.bindEnvironment(socket => {
    socket.on(
      'createCalculation',
      Meteor.bindEnvironment(
        (
          {
            userId = isRequired('userId'),
            xyzs = isRequired('xyzs'),
            parameters = isRequired('parameters'),
            run,
            clusterId,
          },
          callback = () => {},
        ) => {
          // TODO: REALLY NEED PARAMETER CHECKING HERE!!!
          logger.silly('API Creating Calculation...', {
            userId,
            xyzs,
            parameters,
            run,
            clusterId,
          });
          if (run && !clusterId) {
            logger.warn(
              `createCalculation: run is ${run} and clusterId is ${clusterId}...`,
            );
          }
          try {
            const calculationId = createCalculation({
              xyzs,
              parameters,
              userId,
            });
            if (run) {
              runCalculation({ calculationId, userId, clusterId });
            }
            callback(null, {
              calculationId,
              created: calculationId,
              result: calculationId,
            });
          } catch (error) {
            callback({ name: error.name, message: error.message });
            logger.error(`${error.name}: ${error.message}`);
          }
        },
      ),
    );
  }),
);
