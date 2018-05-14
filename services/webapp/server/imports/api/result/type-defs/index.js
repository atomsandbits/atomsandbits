const gql = (value) => value[0];

const typeDefs = gql`
  extend type Query {
    userResults(input: PaginationInput): UserResultsConnection
  }

  enum ResultType {
    CALCULATION
    PROJECT
  }

  type Result implements Node {
    id: ID!
    type: ResultType!
    calculation: Calculation
    project: Project
    createdAt: Float!
  }

  type UserResultsEdge {
    node: Result
    cursor: String!
  }

  type UserResultsConnection {
    pageInfo: PageInfo!
    edges: [UserResultsEdge]
    results: [Result]
    totalCount: Int
  }
`;

export default typeDefs;
