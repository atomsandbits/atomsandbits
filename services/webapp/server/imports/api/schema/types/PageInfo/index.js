const PageInfo = () => [
  `type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
    skip: Int
    limit: Int
  }`,
];

export { PageInfo };
export default { PageInfo };
