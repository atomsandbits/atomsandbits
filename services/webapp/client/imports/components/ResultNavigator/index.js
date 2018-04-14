import React from 'react';
import PropTypes from 'prop-types';
import { compose, onlyUpdateForPropTypes } from 'recompose';

import { ResultNavigatorContainer, BackgroundFill } from './styles';

const enhance = compose(onlyUpdateForPropTypes);

const ResultNavigatorPure = ({ currentResult, resultCount, hasDrawer }) => {
  return (
    <ResultNavigatorContainer hasDrawer={hasDrawer}>
      {currentResult} / {resultCount}
      <BackgroundFill
        width={resultCount > 0 ? currentResult / resultCount * 100 : 0}
      />
    </ResultNavigatorContainer>
  );
};
ResultNavigatorPure.propTypes = {
  currentResult: PropTypes.number.isRequired,
  resultCount: PropTypes.number.isRequired,
  hasDrawer: PropTypes.bool,
};

const ResultNavigator = enhance(ResultNavigatorPure);

export { ResultNavigator };
export default ResultNavigator;
