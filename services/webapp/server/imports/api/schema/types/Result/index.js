import { Calculation } from '../Calculation';
import { Project } from '../Project';

const Result = () => [
  `type Result {
    type: String!
    calculation: Calculation
    project: Project
    createdAt: Float!
  }`,
  Calculation,
  Project,
];

export { Result };
export default { Result };
