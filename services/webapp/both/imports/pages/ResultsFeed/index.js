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
  withState,
} from 'recompose';
import { Helmet } from 'react-helmet';
// import queryParser from 'query-string';
import debounce from 'lodash/debounce';
// import Fade from '@material-ui/core/transitions/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';

// import { logger } from '/both/imports/logger';
// import Header from '/both/imports/components/Header';
import AppLayout from '/both/imports/components/AppLayout';
import ResultNavigator from '/both/imports/components/ResultNavigator';

// import Header from './components/Header';
import CalculationCard from './components/CalculationCard';
import ProjectCard from './components/ProjectCard';
import { withResults } from './withResults';
import { ResultsFeedContainer, ResultsFeedContent } from './styles';

const Loading = (props) => (
  <AppLayout
    mobileOnlyToolbar
    title="Results Feed"
    appContent={
      <ResultsFeedContainer>
        <Helmet>
          <title>playground | atoms+bits</title>
          <meta name="description" content="your results feed" />
        </Helmet>
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
  ({ data }) => data.userResults.totalCount === 0,
  renderComponent(() => <Redirect to="/new-calculation" />)
);

const onScroll = debounce(
  ({ setPosition }) => {
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
    setPosition(topElement);
    // setQueryParams({
    //   locationPathname,
    //   queryString,
    //   replaceState,
    //   queryParams: { result: topElement },
    // });
  },
  100,
  { maxWait: 500 }
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
    replaceState: history.replace,
  })),
  // withState('sortBy', 'setSortBy', 'createdAt'),
  // withState('sortDirection', 'setSortDirection', -1),
  // withState('tag', 'setTag', ''),
  // withState('search', 'setSearch', ''),
  withState('position', 'setPosition', 0),
  withHandlers({
    scroll: ({ setPosition }) => () => onScroll({ setPosition }),
  }),
  lifecycle({
    componentDidMount() {
      const { scroll } = this.props;
      document.addEventListener('scroll', scroll);
    },
    componentWillUnmount() {
      const { scroll } = this.props;
      document.removeEventListener('scroll', scroll);
      onScroll.cancel();
    },
  }),
  onlyUpdateForPropTypes
);

const ResultsFeedPure = ({ results, position, totalCount, queryParams }) => (
  <AppLayout
    mobileOnlyToolbar
    title="Results Feed"
    appContent={
      <ResultsFeedContainer>
        <Helmet>
          <title>playground | atoms+bits</title>
          <meta name="description" content="your results feed" />
        </Helmet>
        <ResultsFeedContent>
          {/* {logger.info('Results', results)} */}
          {results.map(
            (result, index) =>
              result.type === 'CALCULATION' ? (
                <CalculationCard
                  calculation={result.calculation}
                  index={index}
                  className="result"
                  key={result.id}
                />
              ) : (
                <ProjectCard
                  project={result.project}
                  index={index}
                  className="result"
                  key={result.id}
                />
              )
          )}
        </ResultsFeedContent>
        <ResultNavigator currentResult={position} resultCount={totalCount} />
      </ResultsFeedContainer>
    }
  />
);
ResultsFeedPure.propTypes = {
  position: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  queryParams: PropTypes.object,
};

const ResultsFeed = enhance(ResultsFeedPure);

export { ResultsFeed };
export default ResultsFeed;
