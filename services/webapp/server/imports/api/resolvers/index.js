import { Query } from './Query';
import { Mutation } from './Mutation';
import { UserResultsConnection } from './connections/UserResults';
import { Geometry } from './types/Geometry';
import { Calculation } from './types/Calculation';
import { Result } from './types/Result';

export const resolvers = {
  Query,
  Mutation,
  /* Types */
  Calculation,
  Geometry,
  Result,
  /* Connections */
  // UserResultsConnection,
};

export default { resolvers };
