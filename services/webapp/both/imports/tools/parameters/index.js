getPossibleParameters = (currentParameters) => {
  let possibleParameters = []
  possibleParameters.push("calculationType")
  possibleParameters.push("calculationMethod")
  if (currentParameters.calculationMethod === "machineLearning") {
    possibleParameters.push("network")
  } else {
    possibleParameters.push("basisSet")
    possibleParameters.push("charge")
    possibleParameters.push("multiplicity")
  }
  if (currentParameters.calculationMethod === "dft" || currentParameters.calculationMethod === "tddft") {
    possibleParameters.push("functional")
  }
  if (currentParameters.calculationType === "conformerSearch") {
    possibleParameters.push("numberOfConformers")
  }
  if (currentParameters.calculationType === "periodicBoundaryCondition") {
    possibleParameters.push("densityFit")
    possibleParameters.push("periodicCalculationType")
    possibleParameters.push("latticeVectors")
    if (currentParameters.densityFit !== "fftdf" && currentParameters.densityFit !== "aftdf") {
      possibleParameters.push("auxBasisSet")
    }
    if (currentParameters.periodicCalculationType !== "superMolecule") {
      possibleParameters.push("pseudoPotential")
    }
    if (currentParameters.periodicCalculationType === "kPoint" || currentParameters.periodicCalculationType === "superMolecule") {
      possibleParameters.push("kPoints")
    }
  }
  return possibleParameters;
}

import {
  calculationTypes
} from '/both/imports/config/calculation-types';
import {
  periodicCalculationTypes
} from '/both/imports/config/periodic-calculation-types';
import {
  geometryOptimizationMethods,
  groundStateMethods,
  excitedStateMethods,
  conformerSearchMethods,
  harmonicSpectraMethods,
  periodicBoundaryConditionMethods
} from '/both/imports/config/calculation-methods';
import {
  networks
} from '/both/imports/config/networks';
import {
  defaultDensityFits,
  periodicDensityFits
} from '/both/imports/config/density-fits';
import {
  defaultBasisSets,
  periodicBasisSets
} from '/both/imports/config/basis-sets';
import {
  auxBasisSets
} from '/both/imports/config/aux-basis-sets';
import {
  pseudoPotentials
} from '/both/imports/config/pseudo-potentials';
import {
  functionals
} from '/both/imports/config/functionals';
import {
  multiplicities
} from '/both/imports/config/multiplicities';
getParameterOptions = (xyz, currentParameters, parameter) => {
  switch (parameter) {
    case "calculationType":
      return calculationTypes;
      break;
    case "periodicCalculationType":
      return periodicCalculationTypes;
      break;
    case "calculationMethod":
      if (currentParameters.calculationType === "geometryOptimization")
        return geometryOptimizationMethods;
      else if (currentParameters.calculationType == "groundState")
        return groundStateMethods;
      else if (currentParameters.calculationType == "conformerSearch")
        return conformerSearchMethods;
      else if (currentParameters.calculationType == "harmonicSpectra")
        return harmonicSpectraMethods;
      else if (currentParameters.calculationType == "excitedState")
        return excitedStateMethods;
      else if (currentParameters.calculationType == "periodicBoundaryCondition")
        return periodicBoundaryConditionMethods;
      else
        throw new Error("Calc method not found.")
      break;
    case "network":
      return networks;
    case "densityFit":
      if (currentParameters.calculationType == "periodicBoundaryCondition" && currentParameters.periodicCalculationType !== "superMolecule")
        return periodicDensityFits;
      else
        return defaultDensityFits;
      break;
    case "basisSet":
      if (currentParameters.calculationType == "periodicBoundaryCondition" && currentParameters.periodicCalculationType !== "superMolecule")
        return periodicBasisSets;
      else
        return defaultBasisSets;
      break;
    case "auxBasisSet":
      return auxBasisSets
      break;
    case "pseudoPotential":
      return pseudoPotentials
      break;
    case "functional":
      return functionals;
      break;
    case "kPoints":
      break;
    case "charge":
      break;
    case "multiplicity":
      return multiplicities;
      break;
  }
}
validateParameters = (parameters) => {
// TODO: validateParameters :P
}

export {
  getPossibleParameters,
  getParameterOptions,
  validateParameters
}
