import { Meteor } from 'meteor/meteor';
import io from '/server/imports/socket-io';
import logger from '/both/imports/logger';
import { saveCalculationResult } from '/server/imports/db/calculations/update';

io.on(
  'connection',
  Meteor.bindEnvironment(socket => {
    socket.on(
      'saveCalculationResult',
      Meteor.bindEnvironment(
        (
          {
            calculationId = isRequired('calculationId'),
            properties = isRequired('properties'),
            output,
          },
          callback = () => {},
        ) => {
          logger.info('API saveCalculationResult...', properties);
          try {
            const calculationUpdated = saveCalculationResult({
              calculationId,
              properties,
              output,
            });
            callback(null, {
              updated: calculationUpdated,
              result: calculationUpdated,
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
