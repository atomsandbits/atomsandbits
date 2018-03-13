import { Layer } from '../Layer';

const Project = () => [
  `type Project {
    id: String!
    layers: [Layer]
  }`,
  Layer
];

export { Project };
export default { Project };
