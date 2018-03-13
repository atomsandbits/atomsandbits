import { Geometry } from '/server/imports/api/schema/types/Geometry';
import { Calculation } from '/server/imports/api/schema/types/Calculation';
import { Result } from '/server/imports/api/schema/types/Result';
import { Project } from '/server/imports/api/schema/types/Project';

const RootQuery = () => [
  `input GeometryInput {
    id: String!
    calculationId: String
  }
  input CalculationInput {
    id: String!
  }
  input ProjectInput {
    id: String!
  }

  input ResultsInput {
    limit: Int!
    skip: Int!
    sortBy: String!
    sortOrder: Int!
    search: String
  }
  input GeometriesInput {
    search: String!
  }

  type Query {
    say: String

    geometry(input: GeometryInput): Geometry
    calculation(input: CalculationInput): Calculation
    project(input: ProjectInput): Project

    results(input: ResultsInput): [Result]
    resultCount: Int!

    geometries(input: GeometriesInput): [Geometry]
  }`,
  Geometry,
  Calculation,
  Result,
  Project,
];

export { RootQuery };
export default { RootQuery };
