import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import {
  compose,
  branch,
  lifecycle,
  mapProps,
  onlyUpdateForPropTypes,
  renderComponent,
  withHandlers,
} from 'recompose';
import queryParser from 'query-string';
import debounce from 'lodash/debounce';
import Fade from 'material-ui/transitions/Fade';
import { LinearProgress } from 'material-ui/Progress';

import { logger } from '/both/imports/logger';
// import Header from '/client/imports/components/Header';
import AppLayout from '/client/imports/components/AppLayout';
import ResultNavigator from '/client/imports/components/ResultNavigator';

// import Header from './components/Header';
import CalculationCard from './components/CalculationCard';
import { withResults } from './withResults';
import { ResultsFeedContainer, ResultsFeedContent } from './styles';

const getQueryParams = ({ queryString }) => {
  return queryParser.parse(queryString);
};
const setQueryParams = debounce(
  ({ locationPathname, queryString, queryParams, replaceState }) => {
    const query = queryParser.parse(queryString);
    const newQuery = { ...query, ...queryParams };
    const newQueryString = `?${queryParser.stringify(newQuery)}`;
    if (queryString !== newQueryString) {
      replaceState(`${locationPathname}${newQueryString}`);
    }
  },
  100,
  { maxWait: 3000 }
);

const Loading = props => (
  <AppLayout
    mobileOnlyToolbar
    title="Results Feed"
    appContent={
      <ResultsFeedContainer>
        <LinearProgress />
      </ResultsFeedContainer>
    }
  />
);

const displayLoadingState = branch(
  ({ data }) => data.loading && !data.userResults,
  renderComponent(Loading)
);

const redirectWithNoResults = branch(
  ({ data }) => data.userResults.length === 0,
  renderComponent(() => <Redirect to="/new-calculation" />)
);

const onScroll = debounce(
  ({ locationPathname, queryString, replaceState }) => {
    const scrollPosition = window.pageYOffset;
    let topElement = -1;
    document.querySelectorAll('.result').forEach((resultElement, index) => {
      if (topElement === -1) {
        if (resultElement.offsetTop + 100 > scrollPosition) {
          topElement = index;
        }
      }
    });
    topElement = topElement === 0 ? 0 : topElement + 1;
    setQueryParams({
      locationPathname,
      queryString,
      replaceState,
      queryParams: { result: topElement },
    });
  },
  300,
  { maxWait: 2000 }
);

const enhance = compose(
  withRouter,
  withResults,
  displayLoadingState,
  redirectWithNoResults,
  mapProps(({ data, location, history }) => ({
    results: data.userResults.results,
    totalCount: data.userResults.totalCount,
    locationPathname: location.pathname,
    queryString: location.search,
    queryParams: getQueryParams({ queryString: location.search }),
    replaceState: history.replace,
  })),
  // withState('sortBy', 'setSortBy', 'createdAt'),
  // withState('sortDirection', 'setSortDirection', -1),
  // withState('tag', 'setTag', ''),
  // withState('search', 'setSearch', ''),
  withHandlers({
    scroll: ({ locationPathname, queryString, replaceState }) => () =>
      onScroll({ locationPathname, queryString, replaceState }),
  }),
  lifecycle({
    componentDidMount() {
      const { scroll } = this.props;
      document.title = 'results | cloudszi';
      document.addEventListener('scroll', scroll);
    },
    componentWillUnmount() {
      const { scroll } = this.props;
      document.removeEventListener('scroll', scroll);
      setQueryParams.cancel();
    },
  }),
  onlyUpdateForPropTypes
);

const ResultsFeedPure = ({ results, totalCount, queryParams }) => (
  <AppLayout
    mobileOnlyToolbar
    title="Results Feed"
    appContent={
      <ResultsFeedContainer>
        <ResultsFeedContent>
          {/* {logger.info('Results', results)} */}
          {results.map((result, index) => (
            <CalculationCard
              calculation={result.calculation}
              index={index}
              className="result"
              key={result.id}
            />
          ))}
        </ResultsFeedContent>
        <ResultNavigator
          currentResult={Number(queryParams.result) || 0}
          resultCount={totalCount}
        />
      </ResultsFeedContainer>
    }
  />
);
ResultsFeedPure.propTypes = {
  queryParams: PropTypes.object.isRequired,
  totalCount: PropTypes.number.isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const ResultsFeed = enhance(ResultsFeedPure);

export { ResultsFeed };
export default ResultsFeed;
