import { Calculation } from '../Calculation';

const Layer = () => [
  `type Layer {
    id: String!
    calculations: [Calculation]
  }`,
  Calculation,
];

export { Layer };
export default { Layer };
