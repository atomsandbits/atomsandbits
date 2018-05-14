import moment from 'moment';
// import logger from '/both/imports/logger';
// import _ from 'lodash';
import { Layers } from '/both/imports/collections';
import { addUserToLayer } from '../update';

// TODO: change geometryId to geometryIds and handle arrays
const createLayer = ({
  layer = isRequired('layer'),
  userId = isRequired('userId'),
}) => {
  // Check to make sure calculation doesn't exist already
  const existingLayer = Layers.findOne(layer, {
    fields: { _id: 1 },
  });
  // TODO: If output or properties are passed in and they don't exist, add them
  if (existingLayer) {
    addUserToLayer({
      userId,
      layerId: existingLayer._id,
    });
    return existingLayer._id;
  }
  // Calculation doesn't exist, create it
  const createdAt = moment().valueOf();
  layer.users = [
    {
      _id: userId,
      createdAt,
    },
  ];
  layer.creatorId = userId;
  layer.createdAt = createdAt;
  return Layers.insert(layer);
};

export { createLayer };
export default {
  createLayer,
};
