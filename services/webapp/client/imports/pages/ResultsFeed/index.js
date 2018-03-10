import React from 'react';
import { compose, branch, renderComponent, withState } from 'recompose';

import Fade from 'material-ui/transitions/Fade';
import { LinearProgress } from 'material-ui/Progress';

// import Header from '/client/imports/components/Header';
import Header from './Header';
import Result from './Result';
import { withData } from './withData';
import { ResultsFeedContainer, ResultsFeedContent } from './styles';

const Loading = props => (
  <ResultsFeedContainer>
    <Header {...props} />
    <LinearProgress />
  </ResultsFeedContainer>
);

const displayLoadingState = branch(
  props => props.data.loading,
  renderComponent(Loading)
);

const ResultsFeedPure = ({ data, ...otherProps }) => (
  <ResultsFeedContainer>
    <Header {...otherProps} />
    <ResultsFeedContent>
      {console.log(data.results)}
      {data.results.map((result, index) => (
        <Result
          result={result}
          index={index}
          key={result.calculation ? result.calculation.id : result.project.id}
        />
      ))}
    </ResultsFeedContent>
  </ResultsFeedContainer>
);

const SORT_BY = 'createdAt';
const SORT_DIRECTION = -1;
const DEFAULT_TAG = '';
const SEARCH = '';
const LIMIT = 30;

const ResultsFeed = compose(
  withState('sortBy', 'setSortBy', SORT_BY),
  withState('sortDirection', 'setSortDirection', SORT_DIRECTION),
  withState('tag', 'setTag', DEFAULT_TAG),
  withState('search', 'setSearch', SEARCH),
  withState('limit', 'setLimit', LIMIT),
  withData,
  displayLoadingState
)(ResultsFeedPure);

export { ResultsFeed };
export default ResultsFeed;
