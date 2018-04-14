import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import { SelectedGeometriesContainer } from './styles';

const enhance = compose();

const SelectedGeometriesPure = () => {
  return <SelectedGeometriesContainer>6 selected</SelectedGeometriesContainer>;
};
SelectedGeometriesPure.propTypes = {};

const SelectedGeometries = enhance(SelectedGeometriesPure);

export { SelectedGeometries };
export default SelectedGeometries;
