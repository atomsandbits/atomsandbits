import { Node } from '../../interfaces/Node';
import { PageInfo } from '../PageInfo';
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
  `type Geometry implements Node {
    id: ID!
    atomicCoords: String!
    molecularFormula: String!
    mass: Float!
    atomCount: Int!
    createdAt: Float!
    tags: [String]
    calculations: [Calculation]
    energies: [EnergyProperty]!
    forces: [ForceProperty]!
    freeEnergies: [FreeEnergyProperty]!
    optimizations: [OptimizationProperty]!
    conformerSearches: [ConformerSearchProperty]!
    harmonicSpectra: [HarmonicSpectrumProperty]!
    mediumImage: String
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
  }`,
  Node,
  PageInfo,
  Calculation,
  Properties,
];

export { Geometry };
export default { Geometry };
