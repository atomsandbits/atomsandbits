import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import moment from 'moment';
import elasticsearch from 'elasticsearch';
import { Calculations, Geometries, Requests } from '/server/imports/db';
import xyzTools from '/both/imports/tools/xyz';

const convertCalculationToGraph = ({ calculationId, calculation, userId }) => {
  if (!calculation) {
    calculation = Calculations.findOne(calculationId);
  }
  const requests = Requests.findOne(
    { calculationId }
    // { sortBy: { createdAt: -1 } }
  );
  // console.log(requests);
  if (!calculation) {
    throw new Error('Calculation not found.');
  }
  return {
    // runTime: moment(lastRun.startedAt).diff(lastRun.completedAt),
    completed: Boolean(requests.completed),
    completedAt: requests.completedAt,
    createdAt: requests.createdAt,
    error: Boolean(calculation.error),
    errorMessage: calculation.error ? calculation.error.message : null,
    geometryIds: calculation.geometryIds,
    id: calculation._id,
    output: calculation.output,
    parameters: calculation.parameters,
    properties: calculation.properties,
    running: Boolean(requests.running),
    startedAt: requests.startedAt,
  };
};

const getCalculation = ({ calculationId, userId }) => {
  return convertCalculationToGraph({ calculationId, userId });
};

const getCalculations = ({ geometryId, calculationIds, userId }) => {
  let calculations;
  if (calculationIds) {
    calculations = Calculations.find({ _id: { $in: calculationIds } }).fetch();
  } else if (geometryId) {
    calculations = Calculations.find({ geometryIds: geometryId }).fetch();
  }
  return calculations.map(calculation => {
    return convertCalculationToGraph({ calculation, userId });
  });
};

export { convertCalculationToGraph, getCalculation, getCalculations };
