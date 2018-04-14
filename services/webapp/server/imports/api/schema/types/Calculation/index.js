import { Geometry } from '../Geometry';
import { User } from '../User';

const CalculationInputParameters = () => [
  `input CalculationInputParameters {
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
  }`,
];

const CalculationParameters = () => [
  `type CalculationParameters {
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
  }`,
];

const CalculationProperties = () => [
  `
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
  }`,
];

const Calculation = () => [
  `type Calculation {
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
  }`,
  CalculationParameters,
  CalculationProperties,
  Geometry,
  User,
];

export { Calculation, CalculationParameters, CalculationInputParameters };
export default {
  Calculation,
  CalculationParameters,
  CalculationInputParameters,
};
