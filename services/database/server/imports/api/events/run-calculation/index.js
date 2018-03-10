import { Meteor } from 'meteor/meteor';
import logger from '/both/imports/logger';
import io from '/server/imports/socket-io';
import { Calculations, Geometries } from '/both/imports/collections';

// Emits the calculations to programs
const runCalculation = Meteor.bindEnvironment(
  ({
    serverId = isRequired('serverId'),
    calculationId = isRequired('calculationId'),
  }) => {
    const calculation = Calculations.findOne(calculationId);
    const { program } = calculation.parameters;
    const geometries = Geometries.find(
      {
        _id: { $in: calculation.geometryIds },
      },
      { fields: { atomicCoords: 1 } },
    ).fetch();
    const calculationForService = {
      _id: calculation._id,
      charge: calculation.parameters.charge,
      geometries: geometries.map(geometry => geometry.atomicCoords),
      method: calculation.parameters.method,
      multiplicity: calculation.parameters.multiplicity,
      type: calculation.parameters.type,
      network: calculation.parameters.network,
    };
    logger.info(`Emitting: Calculation #${calculation._id} to ${serverId}-${program}...`);
    io
      .to(`${serverId}-${program}`)
      .emit('runCalculation', { calculation: calculationForService });
  },
);

export { runCalculation };
export default { runCalculation };
