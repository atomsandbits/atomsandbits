import { Meteor } from 'meteor/meteor';
import io from '/server/imports/socket-io';
import logger from '/both/imports/logger';
import { saveIntermediateCalculationResult } from '/server/imports/db/calculations/update';

io.on(
  'connection',
  Meteor.bindEnvironment(socket => {
    socket.on(
      'saveIntermediateCalculationResult',
      Meteor.bindEnvironment(
        (
          {
            calculationId = isRequired('calculationId'),
            properties = isRequired('properties'),
            output,
          },
          callback = () => {},
        ) => {
          logger.info('API saveIntermediateCalculationResult: ', arguments);
          try {
            const calculationUpdated = saveIntermediateCalculationResult({
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
