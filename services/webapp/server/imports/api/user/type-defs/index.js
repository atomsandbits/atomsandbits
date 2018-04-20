const gql = value => value[0];

const typeDefs = gql`
  type User {
    id: String!
    firstName: String!
    lastName: String!
    calculations: [Calculation]
  }
`;

export default typeDefs;
