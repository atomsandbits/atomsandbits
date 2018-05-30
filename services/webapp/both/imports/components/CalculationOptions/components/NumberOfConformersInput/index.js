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

import getOptionsForParameter from '../../getOptionsForParameter';
import { OptionContainer, TextField } from '../../styles';

const enhance = compose(
  withProps(({ type, method, setNumberOfConformers }) => ({
    showNumberOfConformers: getOptionsForParameter({
      type,
      method,
      parameter: 'numberOfConformers',
    }),
    onInput: (event) => {
      let numberOfConformers = Number(event.target.value);
      if (numberOfConformers > 100) {
        numberOfConformers = 100;
      }
      if (numberOfConformers < 2) {
        numberOfConformers = 2;
      }
      setNumberOfConformers(numberOfConformers);
    },
  })),
  branch(
    ({ showNumberOfConformers }) => !showNumberOfConformers,
    renderNothing
  ),
  branch(
    ({ numberOfConformers }) => typeof numberOfConformers === 'undefined',
    renderComponent(({ setNumberOfConformers }) => {
      setNumberOfConformers(10);
      return null;
    })
  ),
  lifecycle({
    componentWillUnmount() {
      const { unsetNumberOfConformers } = this.props;
      unsetNumberOfConformers();
    },
  }),
  onlyUpdateForPropTypes
);

const NumberOfConformersInputPure = ({ onInput, numberOfConformers }) => (
  <OptionContainer>
    <TextField
      label="Conformers"
      type="number"
      onChange={onInput}
      value={numberOfConformers}
      inputProps={{
        step: 1,
      }}
    />
  </OptionContainer>
);
NumberOfConformersInputPure.propTypes = {
  setNumberOfConformers: PropTypes.func.isRequired,
  unsetNumberOfConformers: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  numberOfConformers: PropTypes.number.isRequired,
  onInput: PropTypes.func.isRequired,
};

const NumberOfConformersInput = enhance(NumberOfConformersInputPure);

export { NumberOfConformersInput };
export default NumberOfConformersInput;
