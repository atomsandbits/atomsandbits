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
  withProps(({ type, method, setAtomTwo }) => ({
    showAtomTwos: getOptionsForParameter({
      type,
      method,
      parameter: 'atomTwo',
    }),
    onInput: (event) => {
      let atomTwo = parseInt(event.target.value);
      if (!atomTwo) {
        atomTwo = 1;
      }
      setAtomTwo(atomTwo);
    },
  })),
  branch(({ showAtomTwos }) => !showAtomTwos, renderNothing),
  branch(
    ({ atomTwo }) => typeof atomTwo === 'undefined',
    renderComponent(({ setAtomTwo }) => {
      setAtomTwo(2);
      return null;
    })
  ),
  lifecycle({
    componentWillUnmount() {
      const { unsetAtomTwo } = this.props;
      unsetAtomTwo();
    },
  }),
  onlyUpdateForPropTypes
);

const AtomTwoInputPure = ({ onInput, atomTwo }) => (
  <OptionContainer>
    <TextField
      label="Atom Two"
      type="number"
      onChange={onInput}
      value={atomTwo}
      inputProps={{
        step: 1,
        min: 1,
      }}
    />
  </OptionContainer>
);
AtomTwoInputPure.propTypes = {
  setAtomTwo: PropTypes.func.isRequired,
  unsetAtomTwo: PropTypes.func.isRequired,
  atomTwo: PropTypes.number.isRequired,
  onInput: PropTypes.func.isRequired,
};

const AtomTwoInput = enhance(AtomTwoInputPure);

export { AtomTwoInput };
export default AtomTwoInput;
