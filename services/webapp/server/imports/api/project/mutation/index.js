import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import logger from '/both/imports/logger';
import { socket } from '/server/imports/db-server-socket';
import { calculationMethods } from '/both/imports/config/calculation-methods';
import { getProject } from '/server/imports/db/projects/read';

const Mutation = {
  runProject(root, args, context) {
    const { userId } = context;
    let { xyzs, layers } = args.input;
    // Restructure parameters for calculation type
    layers = layers.map(layer => ({
      ...layer,
      type: layer.type.toLowerCase(),
      parameters:
        layer.type === 'CALCULATION'
          ? layer.parameters.calculation
          : layer.parameters,
    }));
    // Add Program to Layer
    layers = layers.map(layer => {
      if (layer.type === 'calculation') {
        const { program } = _.filter(calculationMethods, {
          value: layer.parameters.method,
          type: layer.parameters.type,
        })[0];
        layer.parameters.program = program;
      }
      return layer;
    });
    logger.silly(
      `mutation_runProject: \n` +
        `${xyzs}` +
        `${layers.map(layer => JSON.stringify(layer) + '\n')}` +
        `${JSON.stringify(context.user.profile)}`
    );
    if (!userId) {
      return new Promise();
    }
    return new Promise(
      Meteor.bindEnvironment(resolve => {
        socket.emit(
          'createProject',
          {
            clusterId: 'free',
            layers,
            run: true,
            userId,
            xyzs,
          },
          Meteor.bindEnvironment((error, data) => {
            if (error) {
              throw error;
            }
            const { projectId } = data;
            console.log(`newProjectId: ${projectId}`);
            resolve({
              project: getProject({ projectId, userId }),
            });
          })
        );
      })
    );
  },
};

export default Mutation;
