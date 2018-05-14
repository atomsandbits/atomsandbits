import _ from 'lodash';

const defaultDensityFits = [
  {
    value: false,
    prettyName: 'None',
  },
  {
    value: 'gdf',
    prettyName: 'Gaussian',
  },
];

const periodicDensityFits = [
  {
    value: 'fftdf',
    prettyName: 'Fast Fourier Transform',
  },
  {
    value: 'aftdf',
    prettyName: 'Analytical Fourier Transform',
  },
  {
    value: 'gdf',
    prettyName: 'Gaussian',
  },
  {
    value: 'mdf',
    prettyName: 'Mixed',
  },
];

const densityFits = _.concat(defaultDensityFits, periodicDensityFits);

export { densityFits, defaultDensityFits, periodicDensityFits };
