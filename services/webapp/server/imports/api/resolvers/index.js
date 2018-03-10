import { Query } from './Query';
import { Mutation } from './Mutation';
import { Geometry } from './types/Geometry';
import { Calculation } from './types/Calculation';
import { Result } from './types/Result';

export const resolvers = {
  Query,
  Mutation,
  Calculation,
  Geometry,
  Result,
};

export default { resolvers };
