import {
  getCalculation,
  getCalculations,
} from '/server/imports/db/calculations/read';

// TODO: Clean this up...
import { Calculations } from '/server/imports/db';
const prettyPropertyLabel = ({ parameters }) => {
  switch (parameters.method) {
    case 'machineLearning':
      return `${parameters.network}`;
    default:
      return 'unknown property type';
  }
};

const Geometry = {
  calculations(geometry) {
    return getCalculations({ geometryId: geometry.id });
  },
  energies(geometry) {
    const calculationIds = Calculations.find(
      {
        geometryIds: geometry.id,
        'parameters.type': 'groundState',
      },
      { fields: { _id: 1 } }
    )
      .fetch()
      .map(calculation => calculation._id);
    const calculations = getCalculations({ calculationIds });
    return calculations.map(calculation => {
      return {
        energy: calculation.properties ? calculation.properties.energy : null,
        label: prettyPropertyLabel({ parameters: calculation.parameters }),
        running: calculation.running,
        calculation: calculation,
      };
    });
  },
  forces(geometry, args, context, self) {
    // console.log(self.variableValues.geometryInput.calculationId);
    const calculationIds = Calculations.find(
      {
        geometryIds: geometry.id,
        'parameters.type': 'groundState',
      },
      { fields: { _id: 1 } }
    )
      .fetch()
      .map(calculation => calculation._id);
    const calculations = getCalculations({ calculationIds });
    return calculations.map(calculation => {
      return {
        force: calculation.properties ? calculation.properties.force : null,
        label: prettyPropertyLabel({ parameters: calculation.parameters }),
        running: calculation.running,
        calculation: calculation,
      };
    });
  },
  optimizations(geometry, args, context, self) {
    const calculationIds = Calculations.find(
      {
        geometryIds: geometry.id,
        'parameters.type': 'geometryOptimization',
      },
      { fields: { _id: 1 } }
    )
      .fetch()
      .map(calculation => calculation._id);
    const calculations = getCalculations({ calculationIds });
    return calculations.map(calculation => {
      return {
        geometries: calculation.properties
          ? calculation.properties.geometries
          : null,
        energies: calculation.properties
          ? calculation.properties.energies
          : null,
        label: prettyPropertyLabel({ parameters: calculation.parameters }),
        running: calculation.running,
        calculation: calculation,
      };
    });
  },
  harmonicSpectra(geometry) {
    const calculations = Calculations.find(
      {
        geometryIds: geometry.id,
        'parameters.type': 'harmonicSpectra',
      },
      { fields: { parameters: 1, running: 1, properties: 1 } }
    ).fetch();
    return calculations.map(calculation => {
      return {
        frequencies: calculation.properties.frequencies,
        intensities: calculation.properties.intensities,
        label: prettyPropertyLabel({ parameters: calculation.parameters }),
        running: calculation.running,
        calculation: getCalculation({ calculationId: calculation._id }),
      };
    });
  },
};

export { Geometry };
export default { Geometry };
