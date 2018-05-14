import { Meteor } from 'meteor/meteor';
import io from '/server/imports/socket-io';
import logger from '/both/imports/logger';
import { pingCalculationRunning } from '/server/imports/db/calculations/update';

io.on(
  'connection',
  Meteor.bindEnvironment((socket) => {
    socket.on(
      'pingCalculationRunning',
      Meteor.bindEnvironment(
        (
          { calculationId = isRequired('calculationId') },
          callback = () => {}
        ) => {
          logger.info('API pingCalculationRunning...', { calculationId });
          try {
            const calculationUpdated = pingCalculationRunning({
              calculationId,
            });
            callback(null, {
              updated: calculationUpdated,
              result: calculationUpdated,
            });
          } catch (error) {
            callback(new Error(error.message));
            logger.error(`${error.name}: ${error.message}`);
          }
        }
      )
    );
  })
);
