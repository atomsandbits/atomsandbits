import logger from '/both/imports/tools/logger';
import { socket } from '/server/imports/db-server-socket';
import {
  getCalculation,
  getUserCalculations,
  getUserCalculationCount,
  searchUserCalculations,
  getCalculations,
  getCalculationCount,
  searchCalculations,
} from '/server/imports/db/calculations/read';
import { createCalculation } from '/server/imports/db/calculations/create';

import _ from 'lodash';
import { calculationMethods } from '/both/imports/config/calculation-methods';

export const resolvers = {
  Query: {
    say(root, args, context) {
      return 'hello world';
    },
    calculation(root, args, context) {
      logger.silly('calculation_query: ', args);
      if (!context.userId) {
        return;
      }
      return getCalculation({ userId: context.userId, calculationId: args.id });
    },
    myCalculationCount(root, args, context) {
      logger.silly('myCalculationCount_query: ', args);
      if (!context.userId) {
        return 0;
      }
      return getUserCalculationCount({ userId: context.userId });
    },
    myCalculations(root, args, context) {
      logger.silly('myCalculations_query: ', args);
      if (!context.userId) {
        return;
      }
      if (args.search) {
        return searchUserCalculations({
          userId: context.userId,
          limit: args.limit,
          skip: args.skip,
          search: args.search,
        });
      }
      if (args.sortBy === 'created') {
        args.sortOrder = args.sortOrder * -1;
      }
      return getUserCalculations({
        userId: context.userId,
        limit: args.limit,
        skip: args.skip,
        search: args.search,
        sortBy: args.sortBy,
        sortOrder: args.sortOrder,
      });
    },
    calculationCount(root, args, context) {
      logger.silly('calculationCount_query: ', args);
      return getCalculationCount();
    },
    calculations(root, args, context) {
      logger.silly('calculations_query: ', args);
      if (!context.userId) {
        return;
      }
      if (args.search) {
        return searchCalculations({
          userId: context.userId,
          limit: args.limit,
          skip: args.skip,
          search: args.search,
        });
      }
      if (args.sortBy === 'created') {
        args.sortOrder = args.sortOrder * -1;
      }
      if (getCalculationCount() === 0) {
        return;
      }
      return getCalculations({
        userId: context.userId,
        limit: args.limit,
        skip: args.skip,
        search: args.search,
        sortBy: args.sortBy,
        sortOrder: args.sortOrder,
      });
    },
  },
  Mutation: {
    runCalculation(root, args, context) {
      logger.silly('runCalculation_mutation: ', args, context.user.profile);
      const { userId } = context;
      const { xyz, parameters } = args;
      const { program } = _.filter(calculationMethods, {
        value: parameters.method,
        type: parameters.type,
      })[0];
      parameters.program = program;
      const atomicCoords = xyz.split('\n').splice(2).join('\n');
      if (!userId) {
        return new Promise();
      }
      return new Promise(resolve => {
        socket.emit(
          'createCalculation',
          {
            atomicCoordsArray: [atomicCoords],
            clusterId: 'free',
            parameters,
            run: true,
            userId,
          },
          (error, data) => {
            const { calculationId } = data;
            resolve(getCalculation({ calculationId, userId }));
          },
        );
      });
    },
  },
};

export default { resolvers };
