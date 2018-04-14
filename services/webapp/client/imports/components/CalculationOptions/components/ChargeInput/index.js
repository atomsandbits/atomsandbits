import React from 'react';
import PropTypes from 'prop-types';
import {
  branch,
  compose,
  lifecycle,
  onlyUpdateForPropTypes,
  renderNothing,
  renderComponent,
  withProps,
} from 'recompose';

import { OptionContainer, TextField } from '../../styles';
import getOptionsForParameter from '../../getOptionsForParameter';

const enhance = compose(
  withProps(({ type, method, setCharge }) => ({
    showCharges: getOptionsForParameter({
      type,
      method,
      parameter: 'charge',
    }),
    onInput: event => {
      const charge = Number(event.target.value);
      setCharge(charge);
    },
  })),
  branch(({ showCharges }) => !showCharges, renderNothing),
  branch(
    ({ charge }) => typeof charge === 'undefined',
    renderComponent(({ setCharge }) => {
      setCharge(0);
      return null;
    })
  ),
  lifecycle({
    componentWillUnmount() {
      const { unsetCharge } = this.props;
      unsetCharge();
    },
  }),
  onlyUpdateForPropTypes
);

const ChargeInputPure = ({ onInput, charge }) => (
  <OptionContainer>
    <TextField
      label="Charge"
      type="number"
      onChange={onInput}
      value={charge}
      inputProps={{
        step: 1,
      }}
    />
  </OptionContainer>
);
ChargeInputPure.propTypes = {
  setCharge: PropTypes.func.isRequired,
  unsetCharge: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  charge: PropTypes.number.isRequired,
  onInput: PropTypes.func.isRequired,
};

const ChargeInput = enhance(ChargeInputPure);

export { ChargeInput };
export default ChargeInput;
