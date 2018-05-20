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
import { Session } from 'meteor/session';

import MoleculeRenderer from '/client/imports/components/MoleculeRenderer';
import { OptionContainerFullWidth } from '../../styles';
import getOptionsForParameter from '../../getOptionsForParameter';

const enhance = compose(
  withProps(({ type, method, setSecondaryGeometry }) => ({
    showSecondaryGeometrys: getOptionsForParameter({
      type,
      method,
      parameter: 'secondaryGeometry',
    }),
  })),
  branch(
    ({ showSecondaryGeometrys }) => !showSecondaryGeometrys,
    renderNothing
  ),
  branch(
    ({ secondaryGeometry }) => typeof secondaryGeometry === 'undefined',
    renderComponent(({ setSecondaryGeometry }) => {
      setSecondaryGeometry(Session.get('xyz'));
      return null;
    })
  ),
  lifecycle({
    componentWillUnmount() {
      const { unsetSecondaryGeometry } = this.props;
      unsetSecondaryGeometry();
    },
  }),
  onlyUpdateForPropTypes
);

const SecondaryGeometryInputPure = ({
  setSecondaryGeometry,
  secondaryGeometry,
}) => (
  <OptionContainerFullWidth>
    <MoleculeRenderer setXyz={setSecondaryGeometry} xyz={secondaryGeometry} />
  </OptionContainerFullWidth>
);
SecondaryGeometryInputPure.propTypes = {
  setSecondaryGeometry: PropTypes.func.isRequired,
  unsetSecondaryGeometry: PropTypes.func.isRequired,
  secondaryGeometry: PropTypes.string.isRequired,
};

const SecondaryGeometryInput = enhance(SecondaryGeometryInputPure);

export { SecondaryGeometryInput };
export default SecondaryGeometryInput;
