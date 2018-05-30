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
    options: getOptionsForParameter({ type, method, parameter: 'networks' }),
  })),
  branch(({ options }) => !options, renderNothing),
  onlyUpdateForPropTypes
);

const NetworkDropdownPure = ({
  setNetwork,
  unsetNetwork,
  type,
  method,
  network,
  options,
}) => (
  <OptionContainer>
    <DropdownMenu
      value={network}
      unsetValue={unsetNetwork}
      menuItems={options}
      setValue={setNetwork}
      label="Network"
    />
  </OptionContainer>
);
NetworkDropdownPure.propTypes = {
  setNetwork: PropTypes.func.isRequired,
  unsetNetwork: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  network: PropTypes.string,
  options: PropTypes.array.isRequired,
};

const NetworkDropdown = enhance(NetworkDropdownPure);

export { NetworkDropdown };
export default NetworkDropdown;
