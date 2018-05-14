import moment from 'moment';
// import logger from '/both/imports/logger';
import _ from 'lodash';
import { Geometries, Projects } from '/both/imports/collections';
import { createGeometry } from '/server/imports/db/geometries/create';
import { createLayer } from '/server/imports/db/layers/create';
import { addUserToGeometry } from '/server/imports/db/geometries/update';
// import { addUserToCalculation } from '../update';

// TODO: change geometryId to geometryIds and handle arrays
const createProject = ({
  geometryIds,
  xyzs = [],
  layers = isRequired('layers'),
  userId = isRequired('userId'),
  output,
  properties,
}) => {
  /* 1. Create or Update Geometries */
  let geometries = [];
  if (geometryIds) {
    geometries = Geometries.find({ _id: { $in: geometryIds } }).fetch();
    if (!_.isEqual(geometries.map((geometry) => geometry._id), geometryIds)) {
      throw new Error('createProject: geometry not found for geometryIds');
    }
    geometries.forEach((geometry) => {
      addUserToGeometry({ userId, geometryId: geometry._id });
    });
  } else {
    xyzs.forEach((xyz) => {
      geometries.push(Geometries.findOne(createGeometry({ xyz, userId })));
    });
  }
  if (geometries.length === 0) {
    throw new Error('createProject: geometries not defined');
  }
  const _geometryIds = geometries.map((geometry) => geometry._id);
  // TODO: Add Param Validation

  /* 2. Create or Update Layers */
  const layerIds = [];
  let previousLayerId = null;
  layers.forEach(({ type, parameters }) => {
    let input;
    if (previousLayerId) {
      input = { layerId: previousLayerId };
    } else {
      input = {
        geometryIds: _geometryIds,
      };
    }
    const layer = {
      input,
      type,
      parameters,
    };
    const layerId = createLayer({ layer, userId });
    layerIds.push(layerId);
    previousLayerId = layerId;
    // console.log(layer);
  });

  const project = {
    userId,
    geometryIds: _geometryIds,
    layerIds,
  };

  const existingProject = Projects.findOne(project, { fields: { _id: 1 } });
  if (existingProject) {
    return existingProject._id;
  } else {
    project.createdAt = moment().valueOf();
    return Projects.insert(project);
  }
};

export { createProject };
export default {
  createProject,
};
