import { Meteor } from 'meteor/meteor';
import io from '/server/imports/socket-io';
import logger from '/both/imports/logger';
import { saveCalculationResult } from '/server/imports/db/calculations/update';

io.on(
  'connection',
  Meteor.bindEnvironment((socket) => {
    socket.on(
      'saveCalculationResult',
      Meteor.bindEnvironment(
        (
          {
            calculationId = isRequired('calculationId'),
            properties = isRequired('properties'),
            output,
            error,
          },
          callback = () => {}
        ) => {
          logger.info('API saveCalculationResult...', properties);
          try {
            const calculationUpdated = saveCalculationResult({
              calculationId,
              properties,
              output,
              error,
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
