import React from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  branch,
  onlyUpdateForPropTypes,
  renderNothing,
  withProps,
} from 'recompose';

import DropdownMenu from '/both/imports/components/DropdownMenu';
import getOptionsForParameter from '../../getOptionsForParameter';
import { OptionContainer } from '../../styles';

const enhance = compose(
  withProps(({ type, method }) => ({
    options: getOptionsForParameter({ type, method, parameter: 'functionals' }),
  })),
  branch(({ options }) => !options, renderNothing),
  onlyUpdateForPropTypes
);

const FunctionalDropdownPure = ({
  setFunctional,
  unsetFunctional,
  type,
  method,
  functional,
  options,
}) => (
  <OptionContainer>
    <DropdownMenu
      value={functional}
      unsetValue={unsetFunctional}
      menuItems={options}
      setValue={setFunctional}
      label="Functional"
    />
  </OptionContainer>
);
FunctionalDropdownPure.propTypes = {
  setFunctional: PropTypes.func.isRequired,
  unsetFunctional: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  functional: PropTypes.string,
  options: PropTypes.array.isRequired,
};

const FunctionalDropdown = enhance(FunctionalDropdownPure);

export { FunctionalDropdown };
export default FunctionalDropdown;
