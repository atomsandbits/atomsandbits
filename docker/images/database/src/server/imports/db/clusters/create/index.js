import { Clusters } from '/both/imports/collections';

const createCluster = ({
  _id,
  name = 'New Cluster',
  userId = isRequired('userId'),
  size = isRequired('size'),
  serverId = isRequired('serverId'),
  autoRenew = false,
}) =>
  Clusters.insert({
    _id,
    name,
    creatorId: userId,
    size,
    autoRenew,
    serverId,
  });

export { createCluster };
export default { createCluster };
