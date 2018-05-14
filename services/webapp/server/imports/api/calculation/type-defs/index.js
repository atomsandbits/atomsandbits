const gql = (value) => value[0];

const typeDefs = gql`
  extend type Query {
    calculation(input: CalculationInput): Calculation
  }

  extend type Mutation {
    runCalculation(input: RunCalculationInput): RunCalculationPayload
  }

  input CalculationInput {
    id: String!
  }

  input RunCalculationInput {
    xyzs: [String!]!
    parameters: CalculationParametersInput!
  }

  type RunCalculationPayload {
    geometry: Geometry!
    calculation: Calculation!
  }

  input CalculationParametersInput {
    type: String!
    method: String!
    network: String
    basisSet: String
    charge: Int = 0
    numberOfConformers: Int
    multiplicity: Int = 1
    functional: String
    densityFit: String
    auxBasisSet: String
    pseudoPotential: String
    periodicType: String
    latticeVectors: [[Float]]
    kPoints: [Int]
    atomOne: Int
    atomTwo: Int
    finalDistance: Float
    numberOfSteps: Int
  }

  type CalculationParameters {
    type: String!
    method: String!
    program: String
    network: String
    basisSet: String
    charge: Int!
    numberOfConformers: Int
    multiplicity: Int!
    functional: String
    densityFit: String
    auxBasisSet: String
    pseudoPotential: String
    periodicType: String
    latticeVectors: [[Float]]
    kPoints: [Int]
    atomOne: Int
    atomTwo: Int
    finalDistance: Float
    numberOfSteps: Int
  }

  type CalculationProperties {
    energy: Float
    force: [[Float]]
    geometries: [String!]
    energies: [Float!]
    forces: [[[Float]]]
    frequencies: [Float]
    intensities: [Float]
    optimizedGeometry: String
    excitationEnergy: Float
  }

  type Calculation {
    id: String!
    output: String
    parameters: CalculationParameters
    properties: CalculationProperties
    running: Boolean!
    completed: Boolean!
    creator: User!
    geometries: [Geometry]!
    createdAt: String!
    startedAt: String
    completedAt: String
    runTime: String
    error: Boolean
    errorMessage: String
  }
`;

export default typeDefs;
