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
  withProps(({ type, method, setFinalDistance }) => ({
    showFinalDistances: getOptionsForParameter({
      type,
      method,
      parameter: 'finalDistance',
    }),
    onInput: (event) => {
      const finalDistance = Number(event.target.value);
      setFinalDistance(finalDistance);
    },
  })),
  branch(({ showFinalDistances }) => !showFinalDistances, renderNothing),
  branch(
    ({ finalDistance }) => typeof finalDistance === 'undefined',
    renderComponent(({ setFinalDistance }) => {
      setFinalDistance(10);
      return null;
    })
  ),
  lifecycle({
    componentWillUnmount() {
      const { unsetFinalDistance } = this.props;
      unsetFinalDistance();
    },
  }),
  onlyUpdateForPropTypes
);

const FinalDistanceInputPure = ({ onInput, finalDistance }) => (
  <OptionContainer>
    <TextField
      label="Final Distance"
      type="number"
      onChange={onInput}
      value={finalDistance}
      inputProps={{
        step: 1,
        min: 0.0001,
      }}
    />
  </OptionContainer>
);
FinalDistanceInputPure.propTypes = {
  setFinalDistance: PropTypes.func.isRequired,
  unsetFinalDistance: PropTypes.func.isRequired,
  finalDistance: PropTypes.number.isRequired,
  onInput: PropTypes.func.isRequired,
};

const FinalDistanceInput = enhance(FinalDistanceInputPure);

export { FinalDistanceInput };
export default FinalDistanceInput;
