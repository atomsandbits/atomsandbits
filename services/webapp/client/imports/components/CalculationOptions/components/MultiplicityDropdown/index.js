import React from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  branch,
  onlyUpdateForPropTypes,
  renderNothing,
  withProps,
} from 'recompose';

import DropdownMenu from '/client/imports/components/DropdownMenu';
import getOptionsForParameter from '../../getOptionsForParameter';
import { OptionContainer } from '../../styles';

const multiplicities = [
  {
    value: 1,
    prettyName: 'Singlet',
  },
  {
    value: 2,
    prettyName: 'Doublet',
  },
  {
    value: 3,
    prettyName: 'Triplet',
  },
  {
    value: 4,
    prettyName: 'Quartet',
  },
  {
    value: 5,
    prettyName: 'Quintet',
  },
  {
    value: 6,
    prettyName: 'Sextet',
  },
  {
    value: 7,
    prettyName: 'Septet',
  },
  {
    value: 8,
    prettyName: 'Octet',
  },
];

const enhance = compose(
  withProps(({ type, method }) => ({
    showMultiplicities: getOptionsForParameter({
      type,
      method,
      parameter: 'multiplicity',
    }),
    options: multiplicities,
  })),
  branch(({ showMultiplicities }) => !showMultiplicities, renderNothing),
  onlyUpdateForPropTypes
);

const MultiplicityDropdownPure = ({
  setMultiplicity,
  unsetMultiplicity,
  type,
  method,
  multiplicity,
  options,
}) => (
  <OptionContainer>
    <DropdownMenu
      value={multiplicity}
      unsetValue={unsetMultiplicity}
      menuItems={options}
      setValue={setMultiplicity}
      label="Multiplicity"
    />
  </OptionContainer>
);
MultiplicityDropdownPure.propTypes = {
  setMultiplicity: PropTypes.func.isRequired,
  unsetMultiplicity: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  multiplicity: PropTypes.number,
  options: PropTypes.array.isRequired,
};

const MultiplicityDropdown = enhance(MultiplicityDropdownPure);

export { MultiplicityDropdown };
export default MultiplicityDropdown;
