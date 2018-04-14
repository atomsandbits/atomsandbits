import React from 'react';
import PropTypes from 'prop-types';
import { compose, onlyUpdateForPropTypes } from 'recompose';

import DropdownMenu from '/client/imports/components/DropdownMenu';
import calculationOptions from '../../options';
import { OptionContainer } from '../../styles';

const enhance = compose(onlyUpdateForPropTypes);

const TypeDropdownPure = ({ setType, unsetType, type }) => (
  <OptionContainer>
    <DropdownMenu
      value={type}
      unsetValue={unsetType}
      menuItems={calculationOptions}
      setValue={setType}
      label="Calculation"
    />
  </OptionContainer>
);
TypeDropdownPure.propTypes = {
  setType: PropTypes.func.isRequired,
  unsetType: PropTypes.func.isRequired,
  type: PropTypes.string,
};

const TypeDropdown = enhance(TypeDropdownPure);

export { TypeDropdown };
export default TypeDropdown;
