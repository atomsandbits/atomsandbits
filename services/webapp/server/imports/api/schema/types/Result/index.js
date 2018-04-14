import { Node } from '../../interfaces/Node';
import { PageInfo } from '../PageInfo';
import { Calculation } from '../Calculation';
import { Project } from '../Project';

const Result = () => [
  `enum ResultType {
    CALCULATION
    PROJECT
  }
  type Result implements Node {
    id: ID!
    type: ResultType!
    calculation: Calculation
    project: Project
    createdAt: Float!
  }

  type UserResultsEdge {
    node: Result
    cursor: String!
  }

  type UserResultsConnection {
    pageInfo: PageInfo!
    edges: [UserResultsEdge]
    results: [Result]
    totalCount: Int
  }`,
  Node,
  PageInfo,
  Calculation,
  Project,
];

export { Result };
export default { Result };
