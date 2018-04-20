import { getGeometries } from '/server/imports/db/geometries/read';
import { getLayers } from '/server/imports/db/layers/read';

import { typeDefs as Layer } from '../layer';

import Query from './query';
import Mutation from './mutation';
import _typeDefs from './type-defs';

export const typeDefs = () => [_typeDefs, Layer];

export const resolvers = {
  Query,
  Mutation,
  Project: {
    geometries({ geometryIds }) {
      // console.log(calculation);
      return getGeometries({ geometryIds });
    },
    layers({ layerIds }) {
      // console.log(calculation);
      return getLayers({ layerIds });
    },
  },
};
