import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs } from '/server/imports/api/schema';
import { resolvers } from '/server/imports/api/resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
createApolloServer({
  schema,
});
