const PageInfo = () => [
  `type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }`,
];

export { PageInfo };
export default { PageInfo };
