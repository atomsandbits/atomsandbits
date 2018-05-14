const gql = (value) => value[0];

const typeDefs = gql`
  enum LayerSortOptions {
    ENERGY
  }

  enum LayerTypes {
    CALCULATION
    LIMIT
    SORT
    UNIQUE
    FLATTEN
  }

  input LayerInput {
    type: LayerTypes!
    parameters: LayerParametersInput
  }

  input LayerParametersInput {
    calculation: CalculationParametersInput
    limit: Int
    sort: LayerSortOptions
  }

  type LayerParameters {
    calculation: CalculationParameters
    limit: Int
    sort: LayerSortOptions
  }

  type LayerOutput {
    calculation: Calculation
    calculation_: [Calculation]
    geometry: Geometry
    geometry_: [Geometry]
    geometry__: [[Geometry]]
    energy: Float
    energy_: [Float]
    energy__: [Float]
    force: [[Float]]
    force_: [[[Float]]]
    freeEnergy: Float
    freeEnergy_: [Float]
    frequency_: [Float]
    frequency__: [[Float]]
    intensity_: [Float]
    intensity__: [[Float]]
  }

  type Layer {
    id: ID!
    type: LayerTypes!
    running: Boolean!
    completed: Boolean!
    creator: User!
    parameters: LayerParameters
    output: LayerOutput
  }
`;

export default typeDefs;
