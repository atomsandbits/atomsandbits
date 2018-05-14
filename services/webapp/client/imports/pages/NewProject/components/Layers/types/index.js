import memoize from 'lodash/memoize';
import intersection from 'lodash/intersection';

const allLayerTypes = [
  {
    value: 'calculation',
    prettyName: 'Calculation',
    hasValidInputType: memoize((inputTypes) => {
      return intersection(inputTypes, ['geometry', '[geometry]']).length !== 0;
    }),
  },
  // {
  //   value: 'flatten',
  //   prettyName: 'Flatten',
  //   hasValidInputType: memoize(inputTypes => {
  //     let validInputType = false;
  //     inputTypes.forEach(inputType => {
  //       if (inputType.indexOf('[[') !== -1) {
  //         validInputType = true;
  //       }
  //     });
  //     return validInputType;
  //   }),
  // },
  // {
  //   value: 'limit',
  //   prettyName: 'Limit',
  //   hasValidInputType: memoize(inputTypes => {
  //     let validInputType = false;
  //     inputTypes.forEach(inputType => {
  //       if (inputType.indexOf('[') !== -1) {
  //         validInputType = true;
  //       }
  //     });
  //     return validInputType;
  //   }),
  // },
  // {
  //   value: 'sort',
  //   prettyName: 'Sort',
  //   hasValidInputType: memoize(inputTypes => {
  //     return intersection(inputTypes, ['[energy]', '[[energy]]']).length !== 0;
  //   }),
  // },
  // {
  //   value: 'unique',
  //   prettyName: 'Unique',
  //   hasValidInputType: memoize(inputTypes => {
  //     return intersection(inputTypes, ['[geometry]']).length !== 0;
  //   }),
  // },
];

export default allLayerTypes;
