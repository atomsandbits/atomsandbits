export const typeDefs = () => [
  `type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
    skip: Int
    limit: Int
  }`,
];
