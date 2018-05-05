import { Meteor } from 'meteor/meteor';
import logger from '/both/imports/logger';
import '/both/imports/globals';
import './imports/api';
import './imports/db';

import { Clusters, Servers } from '/both/imports/collections';
import { createCluster } from '/server/imports/db/clusters/create';
import { createServer } from '/server/imports/db/servers/create';

Meteor.startup(() => {
  logger.info('Calculation Scheduler running...');
  // Create Free Cluster and Server if they don't exist

  const freeServer = Servers.findOne('free');
  const freeCluster = Clusters.findOne('free');
  let serverId;
  if (!freeServer) {
    serverId = createServer({
      _id: 'free',
      name: 'free',
      nodeSize: 1,
      maxNodes: 500,
      type: 'all',
    });
  }
  if (!freeCluster) {
    serverId = serverId || freeServer._id;
    createCluster({
      _id: 'free',
      name: 'Free Cluster',
      size: 1,
      userId: 'god',
      serverId,
    });
  }
});
