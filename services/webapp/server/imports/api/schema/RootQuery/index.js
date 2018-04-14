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

  enum FilterType {
    SEARCH
    SIMILARITY
    MASS
  }
  input Filter {
    type: FilterType!
    search: String
    minimum: Float
    maximum: Float
    level: Int
  }

  enum Sort {
    CREATED
    MASS
  }
  enum Direction {
    ASC
    DESC
  }
  input Ordering {
    sort: Sort = CREATED
    direction: Direction = ASC
  }

  input PaginationInput {
    filters: [Filter]
    orderBy: Ordering
    after: String
    first: Int
    before: String
    last: Int
  }

  type Query {
    geometry(input: GeometryInput): Geometry
    calculation(input: CalculationInput): Calculation
    project(input: ProjectInput): Project

    userResults(input: PaginationInput): UserResultsConnection
    allGeometries(input: PaginationInput): GeometriesConnection
  }`,
  Geometry,
  Calculation,
  Result,
  Project,
];

export { RootQuery };
export default { RootQuery };
