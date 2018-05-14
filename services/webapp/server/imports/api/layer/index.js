// import { getCalculation } from '/server/imports/db/calculations/read';
import { getGeometry, getGeometries } from '/server/imports/db/geometries/read';

// import { Node } from '../interfaces';
import { typeDefs as Calculation } from '../calculation';
// import { typeDefs as PageInfo } from '../page-info';

import _typeDefs from './type-defs';

export const typeDefs = () => [_typeDefs, Calculation];

export const resolvers = {
  Query: {
    // calculation: (root, args, context) => {
    //   const { id } = args.input;
    //   const { userId } = context;
    //   return getCalculation({ calculationId: id, userId });
    // },
  },
  Layer: {
    output({ output }) {
      if (!output) return;
      const test = {};
      Object.keys(output).forEach((key) => {
        test[key.replace(/\[/g, '').replace(/\]/g, '_')] = output[key];
      });
      return test;
    },
  },
  LayerOutput: {
    geometry({ geometryId }) {
      if (!geometryId) return;
      return getGeometry({ geometryId });
    },
    geometry_({ geometryId_ }) {
      if (!geometryId_) return;
      return getGeometries({ geometryIds: geometryId_ });
    },
    geometry__({ geometryId__ }) {
      if (!geometryId__) return;
      const geometries = [];
      geometryId__.forEach((geometryId_) => {
        geometries.push(getGeometries({ geometryIds: geometryId_ }));
      });
      return geometries;
    },
  },
};
