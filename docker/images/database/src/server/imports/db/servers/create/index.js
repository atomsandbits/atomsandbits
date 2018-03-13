import logger from '/both/imports/logger';
import { Servers } from '/both/imports/collections';

const createServer = ({
  name = isRequired('name'),
  nodeSize = isRequired('nodeSize'),
  maxNodes = isRequired('maxNodes'),
  type = isRequired('type'),
}) => {
  const existingServer = Servers.findOne(name);
  if (existingServer) {
    throw new Error(`createServer: server exists already with name ${name}`);
  }
  return Servers.insert({
    _id: name,
    nodeSize,
    maxNodes,
    type,
  });
};

export { createServer };
export default { createServer };
