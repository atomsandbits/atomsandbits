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
  withProps(({ type, method, setAtomOne }) => ({
    showAtomOnes: getOptionsForParameter({
      type,
      method,
      parameter: 'atomOne',
    }),
    onInput: (event) => {
      let atomOne = parseInt(event.target.value);
      if (!atomOne) {
        atomOne = 1;
      }
      setAtomOne(atomOne);
    },
  })),
  branch(({ showAtomOnes }) => !showAtomOnes, renderNothing),
  branch(
    ({ atomOne }) => typeof atomOne === 'undefined',
    renderComponent(({ setAtomOne }) => {
      setAtomOne(1);
      return null;
    })
  ),
  lifecycle({
    componentWillUnmount() {
      const { unsetAtomOne } = this.props;
      unsetAtomOne();
    },
  }),
  onlyUpdateForPropTypes
);

const AtomOneInputPure = ({ onInput, atomOne }) => (
  <OptionContainer>
    <TextField
      label="Atom One"
      type="number"
      onChange={onInput}
      value={atomOne}
      inputProps={{
        step: 1,
        min: 1,
      }}
    />
  </OptionContainer>
);
AtomOneInputPure.propTypes = {
  setAtomOne: PropTypes.func.isRequired,
  unsetAtomOne: PropTypes.func.isRequired,
  atomOne: PropTypes.number.isRequired,
  onInput: PropTypes.func.isRequired,
};

const AtomOneInput = enhance(AtomOneInputPure);

export { AtomOneInput };
export default AtomOneInput;
