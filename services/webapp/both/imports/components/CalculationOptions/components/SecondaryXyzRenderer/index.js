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

import MoleculeRenderer from '/both/imports/components/MoleculeRenderer';
import { OptionContainerFullWidth } from '../../styles';
import getOptionsForParameter from '../../getOptionsForParameter';

const enhance = compose(
  withProps(({ type, method, setsecondaryXyz }) => ({
    showsecondaryXyzs: getOptionsForParameter({
      type,
      method,
      parameter: 'secondaryXyz',
    }),
  })),
  branch(({ showsecondaryXyzs }) => !showsecondaryXyzs, renderNothing),
  branch(
    ({ secondaryXyz }) => typeof secondaryXyz === 'undefined',
    renderComponent(({ setsecondaryXyz }) => {
      setsecondaryXyz(Session.get('xyz'));
      return null;
    })
  ),
  lifecycle({
    componentWillUnmount() {
      const { unsetsecondaryXyz } = this.props;
      unsetsecondaryXyz();
    },
  }),
  onlyUpdateForPropTypes
);

const secondaryXyzInputPure = ({ setsecondaryXyz, secondaryXyz }) => (
  <OptionContainerFullWidth>
    <MoleculeRenderer setXyz={setsecondaryXyz} xyz={secondaryXyz} />
  </OptionContainerFullWidth>
);
secondaryXyzInputPure.propTypes = {
  setsecondaryXyz: PropTypes.func.isRequired,
  unsetsecondaryXyz: PropTypes.func.isRequired,
  secondaryXyz: PropTypes.string.isRequired,
};

const secondaryXyzInput = enhance(secondaryXyzInputPure);

export { secondaryXyzInput };
export default secondaryXyzInput;
