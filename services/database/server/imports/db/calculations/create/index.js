import moment from 'moment';
import logger from '/both/imports/logger';
import _ from 'lodash';
import { Calculations, Geometries } from '/both/imports/collections';
import { createGeometry } from '/server/imports/db/geometries/create';
import { addUserToGeometry } from '/server/imports/db/geometries/update';
import { addUserToCalculation } from '../update';

// TODO: change geometryId to geometryIds and handle arrays
const createCalculation = ({
  geometryIds,
  xyzs = [],
  parameters = isRequired('parameters'),
  userId = isRequired('userId'),
  explicit,
  output,
  properties,
}) => {
  let geometries = [];
  if (geometryIds) {
    geometries = Geometries.find({ _id: { $in: geometryIds } }).fetch();
    if (!_.isEqual(geometries.map(geometry => geometry._id), geometryIds)) {
      throw new Error('createCalculation: geometry not found for geometryIds');
    }
    geometries.forEach(geometry => {
      addUserToGeometry({ userId, geometryId: geometry._id });
    });
  } else {
    xyzs.forEach(xyz => {
      geometries.push(Geometries.findOne(createGeometry({ xyz, userId })));
    });
  }
  if (geometries.length === 0) {
    throw new Error('createCalculation: geometries not defined');
  }
  // TODO: Add Param Validation
  const calculation = {
    geometryIds: geometries.map(geometry => geometry._id),
    parameters,
  };
  // Check to make sure calculation doesn't exist already
  const existingCalculation = Calculations.findOne(calculation, {
    fields: { _id: 1 },
  });
  // TODO: If output or properties are passed in and they don't exist, add them
  if (existingCalculation) {
    addUserToCalculation({
      userId,
      calculationId: existingCalculation._id,
      explicit,
    });
    return existingCalculation._id;
  }
  // Calculation doesn't exist, create it
  const createdAt = moment().valueOf();
  calculation.users = [
    {
      _id: userId,
      createdAt,
    },
  ];
  if (explicit) {
    calculation.users[0].explicit = true;
  }
  calculation.creatorId = userId;
  calculation.createdAt = createdAt;
  calculation.properties = properties;
  calculation.output = output;
  return Calculations.insert(calculation);
};

export { createCalculation };
export default {
  createCalculation,
};
