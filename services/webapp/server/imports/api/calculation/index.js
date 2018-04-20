import { getCalculation } from '/server/imports/db/calculations/read';
import { getGeometries } from '/server/imports/db/geometries/read';

import { typeDefs as Geometry } from '../geometry';
import { typeDefs as User } from '../user';

import _typeDefs from './type-defs';
import Mutation from './mutation';

export const typeDefs = () => [_typeDefs, Geometry, User];

export const resolvers = {
  Query: {
    calculation: (root, args, context) => {
      const { id } = args.input;
      const { userId } = context;
      return getCalculation({ calculationId: id, userId });
    },
  },
  Mutation,
  Calculation: {
    geometries(calculation) {
      // console.log(calculation);
      return getGeometries({ geometryIds: calculation.geometryIds });
    },
  },
};
