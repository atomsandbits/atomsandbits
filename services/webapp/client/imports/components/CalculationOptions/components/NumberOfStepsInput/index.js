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
  withProps(({ type, method, setNumberOfSteps }) => ({
    showNumberOfStepss: getOptionsForParameter({
      type,
      method,
      parameter: 'numberOfSteps',
    }),
    onInput: (event) => {
      let numberOfSteps = parseInt(event.target.value);
      numberOfSteps = numberOfSteps > 1 ? numberOfSteps : 2;
      numberOfSteps = numberOfSteps < 100 ? numberOfSteps : 100;
      setNumberOfSteps(numberOfSteps);
    },
  })),
  branch(({ showNumberOfStepss }) => !showNumberOfStepss, renderNothing),
  branch(
    ({ numberOfSteps }) => typeof numberOfSteps === 'undefined',
    renderComponent(({ setNumberOfSteps }) => {
      setNumberOfSteps(10);
      return null;
    })
  ),
  lifecycle({
    componentWillUnmount() {
      const { unsetNumberOfSteps } = this.props;
      unsetNumberOfSteps();
    },
  }),
  onlyUpdateForPropTypes
);

const NumberOfStepsInputPure = ({ onInput, numberOfSteps }) => (
  <OptionContainer>
    <TextField
      label="Steps"
      type="number"
      onChange={onInput}
      value={numberOfSteps}
      inputProps={{
        step: 1,
        min: 2,
        max: 100,
      }}
    />
  </OptionContainer>
);
NumberOfStepsInputPure.propTypes = {
  setNumberOfSteps: PropTypes.func.isRequired,
  unsetNumberOfSteps: PropTypes.func.isRequired,
  numberOfSteps: PropTypes.number.isRequired,
  onInput: PropTypes.func.isRequired,
};

const NumberOfStepsInput = enhance(NumberOfStepsInputPure);

export { NumberOfStepsInput };
export default NumberOfStepsInput;
