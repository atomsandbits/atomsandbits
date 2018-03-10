import { Calculation } from '../Calculation';

const EnergyProperty = () => [
  `type EnergyProperty {
    energy: Float
    label: String!
    running: Boolean!
    calculation: Calculation!
  }`,
  Calculation,
];

const ForceProperty = () => [
  `type ForceProperty {
    force: [[Float]]
    label: String!
    running: Boolean!
    calculation: Calculation!
  }`,
  Calculation,
];

const OptimizationProperty = () => [
  `type OptimizationProperty {
    geometries: [String]
    energies: [Float]
    label: String!
    running: Boolean!
    calculation: Calculation!
  }`,
  Calculation,
];

const HarmonicSpectrumProperty = () => [
  `type HarmonicSpectrumProperty {
    frequencies: [Float]
    wavelengths: [Float]
    label: String!
    running: Boolean!
    calculation: Calculation!
  }`,
  Calculation,
];

const Geometry = () => [
  `type Geometry {
    id: String!
    atomicCoords: String!
    molecularFormula: String!
    atomCount: Int!
    tags: [String]
    calculations: [Calculation]
    energies: [EnergyProperty]!
    forces: [ForceProperty]!
    optimizations: [OptimizationProperty]!
    harmonicSpectra: [HarmonicSpectrumProperty]!
  }`,
  Calculation,
  EnergyProperty,
  ForceProperty,
  OptimizationProperty,
  HarmonicSpectrumProperty,
];

export { Geometry };
export default { Geometry };
