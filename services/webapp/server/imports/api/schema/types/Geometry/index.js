import { Calculation } from '../Calculation';

const Properties = () => [
  `type EnergyProperty {
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
    freeEnergies: [FreeEnergyProperty]!
    optimizations: [OptimizationProperty]!
    conformerSearches: [ConformerSearchProperty]!
    harmonicSpectra: [HarmonicSpectrumProperty]!
    mediumImage: String
  }`,
  Calculation,
  Properties,
];

export { Geometry };
export default { Geometry };
