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
import calculationOptions from '../../options';
import { OptionContainer } from '../../styles';

const enhance = compose(
  withProps(({ type, method }) => ({
    options: calculationOptions.find((option) => option.value === type).methods,
  })),
  onlyUpdateForPropTypes
);

const MethodDropdownPure = ({
  setMethod,
  unsetMethod,
  type,
  method,
  options,
}) => (
  <OptionContainer>
    <DropdownMenu
      value={method}
      unsetValue={unsetMethod}
      menuItems={options}
      setValue={setMethod}
      label="Method"
    />
  </OptionContainer>
);
MethodDropdownPure.propTypes = {
  setMethod: PropTypes.func.isRequired,
  unsetMethod: PropTypes.func.isRequired,
  type: PropTypes.string,
  method: PropTypes.string,
  options: PropTypes.array.isRequired,
};

const MethodDropdown = enhance(MethodDropdownPure);

export { MethodDropdown };
export default MethodDropdown;
