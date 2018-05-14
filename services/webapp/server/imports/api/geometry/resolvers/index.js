import { getCalculations } from '/server/imports/db/calculations/read';

// TODO: Clean this up...
import { Calculations } from '/server/imports/db';
const prettyPropertyLabel = ({
  parameters: {
    network,
    type,
    method,
    basisSet,
    functional,
    atomOne,
    atomTwo,
    finalDistance,
    numberOfSteps,
    numberOfConformers,
  },
}) => {
  let label = '';
  switch (method) {
    case 'machineLearning':
      label += `${network}`;
      break;
    default:
      label += `${method} ${basisSet} ${functional ? functional : ''}`;
  }
  switch (type) {
    case 'relaxedScan':
      label += ` - ${atomOne}, ${atomTwo} -> ${finalDistance} : ${numberOfSteps}`;
      break;
    case 'conformerSearch':
      label += ` - ${numberOfConformers}`;
      break;
    default:
      break;
  }
  return label;
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
      .map((calculation) => calculation._id);
    const calculations = getCalculations({ calculationIds });
    return calculations.map((calculation) => {
      return {
        energy: calculation.properties ? calculation.properties.energy : null,
        label: prettyPropertyLabel({ parameters: calculation.parameters }),
        error: calculation.errorMessage,
        running: !calculation.completed,
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
      .map((calculation) => calculation._id);
    const calculations = getCalculations({ calculationIds });
    return calculations.map((calculation) => {
      return {
        force: calculation.properties ? calculation.properties.force : null,
        label: prettyPropertyLabel({ parameters: calculation.parameters }),
        error: calculation.errorMessage,
        running: !calculation.completed,
        calculation: calculation,
      };
    });
  },
  freeEnergies(geometry, args, context, self) {
    // console.log(self.variableValues.geometryInput.calculationId);
    const calculationIds = Calculations.find(
      {
        geometryIds: geometry.id,
        'parameters.type': 'harmonicSpectra',
      },
      { fields: { _id: 1 } }
    )
      .fetch()
      .map((calculation) => calculation._id);
    const calculations = getCalculations({ calculationIds });
    return calculations.map((calculation) => {
      return {
        freeEnergy:
          calculation.properties && calculation.properties.freeEnergy
            ? calculation.properties.freeEnergy['300K1ATM']
            : null,
        label:
          prettyPropertyLabel({ parameters: calculation.parameters }) +
          ' - STP ',
        error: calculation.errorMessage,
        running: !calculation.completed,
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
      .map((calculation) => calculation._id);
    const calculations = getCalculations({ calculationIds });
    return calculations.map((calculation) => {
      return {
        geometries: calculation.properties
          ? calculation.properties.geometries
          : null,
        energies: calculation.properties
          ? calculation.properties.energies
          : null,
        label: prettyPropertyLabel({ parameters: calculation.parameters }),
        error: calculation.errorMessage,
        running: !calculation.completed,
        calculation: calculation,
      };
    });
  },
  conformerSearches(geometry, args, context, self) {
    const calculationIds = Calculations.find(
      {
        geometryIds: geometry.id,
        'parameters.type': 'conformerSearch',
      },
      { fields: { _id: 1 } }
    )
      .fetch()
      .map((calculation) => calculation._id);
    const calculations = getCalculations({ calculationIds });
    return calculations.map((calculation) => {
      return {
        geometries: calculation.properties
          ? calculation.properties.geometries
          : null,
        energies: calculation.properties
          ? calculation.properties.energies
          : null,
        label: prettyPropertyLabel({ parameters: calculation.parameters }),
        error: calculation.errorMessage,
        running: !calculation.completed,
        calculation: calculation,
      };
    });
  },
  harmonicSpectra(geometry) {
    const calculationIds = Calculations.find(
      {
        geometryIds: geometry.id,
        'parameters.type': 'harmonicSpectra',
      },
      { fields: { _id: 1 } }
    )
      .fetch()
      .map((calculation) => calculation._id);
    const calculations = getCalculations({ calculationIds });
    return calculations.map((calculation) => {
      return {
        frequencies: calculation.properties
          ? calculation.properties.frequencies
          : null,
        intensities: calculation.properties
          ? calculation.properties.intensities
          : null,
        optimizedGeometry: calculation.properties
          ? calculation.properties.optimizedGeometry
          : null,
        label: prettyPropertyLabel({ parameters: calculation.parameters }),
        error: calculation.errorMessage,
        running: !calculation.completed,
        calculation: calculation,
      };
    });
  },
  relaxedScans(geometry, args, context, self) {
    const calculationIds = Calculations.find(
      {
        geometryIds: geometry.id,
        'parameters.type': 'relaxedScan',
      },
      { fields: { _id: 1 } }
    )
      .fetch()
      .map((calculation) => calculation._id);
    const calculations = getCalculations({ calculationIds });
    return calculations.map((calculation) => {
      return {
        geometries: calculation.properties
          ? calculation.properties.geometries
          : null,
        energies: calculation.properties
          ? calculation.properties.energies
          : null,
        distances: calculation.properties
          ? calculation.properties.distances
          : null,
        label: prettyPropertyLabel({ parameters: calculation.parameters }),
        error: calculation.errorMessage,
        running: !calculation.completed,
        calculation: calculation,
      };
    });
  },
};

export { Geometry };
export default { Geometry };
