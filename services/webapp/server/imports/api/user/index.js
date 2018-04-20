import { Node } from '../interfaces';
import { typeDefs as Calculation } from '../calculation';

import _typeDefs from './type-defs';

export const typeDefs = () => [_typeDefs, Node, Calculation];

export const resolvers = {
  Query: {
    // calculation: (root, args, context) => {
    //   const { id } = args.input;
    //   const { userId } = context;
    //   return getCalculation({ calculationId: id, userId });
    // },
  },
};
