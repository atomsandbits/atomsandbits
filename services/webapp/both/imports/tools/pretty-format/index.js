import _ from 'lodash';

import { calculationTypes } from '/both/imports/config/calculation-types';
import { periodicCalculationTypes } from '/both/imports/config/periodic-calculation-types';
import { calculationMethods } from '/both/imports/config/calculation-methods';
import { networks } from '/both/imports/config/networks';
import { densityFits } from '/both/imports/config/density-fits';
import { basisSets } from '/both/imports/config/basis-sets';
import { auxBasisSets } from '/both/imports/config/aux-basis-sets';
import { pseudoPotentials } from '/both/imports/config/pseudo-potentials';
import { functionals } from '/both/imports/config/functionals';
import { multiplicities } from '/both/imports/config/multiplicities';

const allProperties = _.concat(
  calculationTypes,
  periodicCalculationTypes,
  calculationMethods,
  networks,
  densityFits,
  basisSets,
  auxBasisSets,
  pseudoPotentials,
  functionals,
  multiplicities
);

const prettyFormat = (value) => {
  return _.find(allProperties, { value: value }).prettyName;
};

export default prettyFormat;
