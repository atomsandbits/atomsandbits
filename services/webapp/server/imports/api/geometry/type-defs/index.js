const gql = (value) => value[0];

const typeDefs = gql`
  extend type Query {
    geometry(input: GeometryInput): Geometry
    allGeometries(input: PaginationInput): GeometriesConnection
  }

  extend type Mutation {
    createGeometryTag(input: CreateGeometryTagInput): CreateGeometryTagPayload
    deleteGeometryTag(input: DeleteGeometryTagInput): DeleteGeometryTagPayload
  }

  input GeometryInput {
    id: ID!
    calculationId: String
  }

  input CreateGeometryTagInput {
    tag: String!
    geometryId: String!
  }

  type CreateGeometryTagPayload {
    tags: [String]!
  }

  input DeleteGeometryTagInput {
    tag: String!
    geometryId: String!
  }

  type DeleteGeometryTagPayload {
    tags: [String]!
  }

  type EnergyProperty {
    energy: Float
    label: String!
    error: String
    running: Boolean!
    calculation: Calculation!
  }

  type ForceProperty {
    force: [[Float]]
    label: String!
    error: String
    running: Boolean!
    calculation: Calculation!
  }

  type OptimizationProperty {
    geometries: [String]
    energies: [Float]
    label: String!
    error: String
    running: Boolean!
    calculation: Calculation!
  }

  type ConformerSearchProperty {
    geometries: [String]
    energies: [Float]
    label: String!
    error: String
    running: Boolean!
    calculation: Calculation!
  }

  type FreeEnergyProperty {
    freeEnergy: Float
    label: String!
    error: String
    running: Boolean!
    calculation: Calculation!
  }

  type HarmonicSpectrumProperty {
    frequencies: [Float]
    intensities: [Float]
    optimizedGeometry: String
    label: String!
    error: String
    running: Boolean!
    calculation: Calculation!
  }

  type RelaxedScanProperty {
    geometries: [String]
    energies: [Float]
    distances: [Float]
    label: String!
    error: String
    running: Boolean!
    calculation: Calculation!
  }

  type Geometry implements Node {
    id: ID!
    atomicCoords: String!
    molecularFormula: String!
    mass: Float!
    atomCount: Int!
    createdAt: Float!
    tags: [String]!
    calculations: [Calculation]
    energies: [EnergyProperty]!
    forces: [ForceProperty]!
    freeEnergies: [FreeEnergyProperty]!
    optimizations: [OptimizationProperty]!
    conformerSearches: [ConformerSearchProperty]!
    harmonicSpectra: [HarmonicSpectrumProperty]!
    relaxedScans: [RelaxedScanProperty]!
  }

  type GeometriesEdge {
    node: Geometry
    cursor: String!
  }

  type GeometriesConnection {
    pageInfo: PageInfo!
    edges: [GeometriesEdge]
    geometries: [Geometry]
    totalCount: Int
  }
`;

export default typeDefs;
