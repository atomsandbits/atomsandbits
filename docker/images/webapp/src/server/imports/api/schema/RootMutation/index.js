import { CalculationInputParameters } from '/server/imports/api/schema/types/Calculation';
import { Geometry } from '/server/imports/api/schema/types/Geometry';

const RootMutation = () => [
  `input RunCalculationInput {
    xyzs: [String!]!
    parameters: CalculationInputParameters!
  }
  type RunCalculationPayload {
    geometry: Geometry!
    calculation: Calculation!
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

  type Mutation {
    runCalculation(input: RunCalculationInput): RunCalculationPayload

    createGeometryTag(input: CreateGeometryTagInput): CreateGeometryTagPayload
    deleteGeometryTag(input: DeleteGeometryTagInput): DeleteGeometryTagPayload
  }
  `,
  CalculationInputParameters,
  Geometry,
];

export { RootMutation };
export default { RootMutation };
