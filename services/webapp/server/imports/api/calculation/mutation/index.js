import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import logger from '/both/imports/logger';
import { socket } from '/server/imports/db-server-socket';
import { calculationMethods } from '/both/imports/config/calculation-methods';
import { getCalculation } from '/server/imports/db/calculations/read';

const Mutation = {
  runCalculation(root, args, context) {
    logger.silly('mutation_runCalculation: ', args.input, context.user.profile);
    const { userId } = context;
    const { xyzs, parameters } = args.input;
    const { program } = _.filter(calculationMethods, {
      value: parameters.method,
      type: parameters.type,
    })[0];
    parameters.program = program;
    if (!userId) {
      return new Promise();
    }
    return new Promise(
      Meteor.bindEnvironment(resolve => {
        socket.emit(
          'createCalculation',
          {
            xyzs,
            clusterId: 'free',
            parameters,
            run: true,
            userId,
          },
          Meteor.bindEnvironment((error, data) => {
            if (error) {
              throw error;
            }
            const { calculationId } = data;
            resolve({
              calculation: getCalculation({ calculationId, userId }),
            });
          })
        );
      })
    );
  },
};

export default Mutation;
