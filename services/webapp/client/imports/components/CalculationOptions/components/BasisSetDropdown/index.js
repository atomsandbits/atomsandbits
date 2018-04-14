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

const enhance = compose(
  withProps(({ type, method }) => ({
    options: getOptionsForParameter({ type, method, parameter: 'basisSets' }),
  })),
  branch(({ options }) => !options, renderNothing),
  onlyUpdateForPropTypes
);

const BasisSetDropdownPure = ({
  setBasisSet,
  unsetBasisSet,
  type,
  method,
  basisSet,
  options,
}) => (
  <OptionContainer>
    <DropdownMenu
      value={basisSet}
      unsetValue={unsetBasisSet}
      menuItems={options}
      setValue={setBasisSet}
      label="Basis Set"
    />
  </OptionContainer>
);
BasisSetDropdownPure.propTypes = {
  setBasisSet: PropTypes.func.isRequired,
  unsetBasisSet: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  basisSet: PropTypes.string,
  options: PropTypes.array.isRequired,
};

const BasisSetDropdown = enhance(BasisSetDropdownPure);

export { BasisSetDropdown };
export default BasisSetDropdown;
