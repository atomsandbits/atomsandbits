import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';
import {
  typeDefs as Calculation,
  resolvers as calculationResolvers,
} from './calculation';
import {
  typeDefs as Geometry,
  resolvers as geometryResolvers,
} from './geometry';
import { typeDefs as Layer, resolvers as layerResolvers } from './layer';
import { typeDefs as Project, resolvers as projectResolvers } from './project';
import { typeDefs as Result, resolvers as resultResolvers } from './result';
import { typeDefs as User, resolvers as userResolvers } from './user';

// If you had Query fields not associated with a
// specific type you could put them here
const Query = `
  type Query {
    _empty: String
  }
`;
const Mutation = `
  type Mutation {
    _empty: String
  }
`;

const resolvers = {};
const schema = makeExecutableSchema({
  typeDefs: [
    Query,
    Mutation,
    Calculation,
    Geometry,
    Layer,
    Project,
    Result,
    User,
  ],
  resolvers: merge(
    resolvers,
    calculationResolvers,
    geometryResolvers,
    layerResolvers,
    projectResolvers,
    resultResolvers,
    userResolvers
  ),
});
createApolloServer({
  schema,
});
