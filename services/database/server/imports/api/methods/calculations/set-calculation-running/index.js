import { Meteor } from 'meteor/meteor';
import io from '/server/imports/socket-io';
import logger from '/both/imports/logger';
import { setCalculationRunning } from '/server/imports/db/calculations/update';

io.on(
  'connection',
  Meteor.bindEnvironment((socket) => {
    socket.on(
      'setCalculationRunning',
      Meteor.bindEnvironment(
        (
          { calculationId = isRequired('calculationId') },
          callback = () => {}
        ) => {
          logger.silly('API setCalculationRunning...');
          try {
            const calculationUpdated = setCalculationRunning({
              calculationId,
            });
            callback(null, {
              updated: calculationUpdated >= 1, // false
              result: calculationUpdated,
            });
          } catch (error) {
            callback(new Error(error.message));
            logger.error(`${error.name}: ${error.message}`);
          }
        }
      )
    );
    socket.on('helloWorld', ({ text }, callback = () => {}) => {
      logger.silly('Hello there!', text);
      callback(null, {
        received: true,
      });
    });
  })
);
