const gql = (value) => value[0];

const typeDefs = gql`
  extend type Query {
    project(input: ProjectInput): Project
  }

  extend type Mutation {
    runProject(input: RunProjectInput): RunProjectPayload
  }

  input ProjectInput {
    id: ID!
  }

  input RunProjectInput {
    xyzs: [String!]!
    layers: [LayerInput!]!
  }

  type RunProjectPayload {
    project: Project!
  }

  type Project {
    id: ID!
    createdAt: Float!
    completed: Boolean!
    geometries: [Geometry]
    layers: [Layer]
  }
`;

export default typeDefs;
