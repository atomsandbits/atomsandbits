import { Calculation } from '../Calculation';

const User = () => [
  `type User {
    id: String!
    firstName: String!
    lastName: String!
    calculations: [Calculation]
  }`,
  Calculation,
];

export { User };
export default { User };
