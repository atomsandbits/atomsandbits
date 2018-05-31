import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  compose,
  branch,
  renderComponent,
  mapProps,
  lifecycle,
  withHandlers,
  withState,
  onlyUpdateForPropTypes,
} from 'recompose';
import { Helmet } from 'react-helmet';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
// import queryParser from 'query-string';
import clone from 'lodash/clone';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

import AppLayout from '/both/imports/components/AppLayout';
import ResultNavigator from '/both/imports/components/ResultNavigator';
import SearchDrawer from '/both/imports/components/SearchDrawer';
// import SelectedGeometries from '/both/imports/components/SelectedGeometries';

import withGeometries from './withGeometries';
import GeometryCard from './components/GeometryCard';
import {
  GeometrySearchContainer,
  GeometrySearchContent,
  SearchDrawerToggle,
} from './styles';

const Loading = (props) => (
  <AppLayout
    mobileOnlyToolbar
    title="Geometries"
    appContent={
      <GeometrySearchContainer>
        <Helmet>
          <title>geometry search | atoms+bits</title>
          <meta
            name="description"
            content="search for molecular geometries on atoms+bits"
          />
        </Helmet>
        <LinearProgress />
      </GeometrySearchContainer>
    }
  />
);

const displayLoadingState = branch(({ data }) => {
  // console.log('test', JSON.stringify(data.variables));
  return data.loading && !data.allGeometries;
}, renderComponent(Loading));

const throttled = throttle((myFxn) => {
  myFxn();
}, 2000);

const onScroll = debounce(
  ({ setPosition, fetchNext }) => {
    const scrollPosition = window.pageYOffset;
    const bodyFullHeight = document.body.scrollHeight;
    const bodyVisibleHeight = document.body.offsetHeight;
    const distanceToBottom =
      bodyFullHeight - bodyVisibleHeight - scrollPosition;
    let topElement = -1;
    let geometryElements = document.querySelectorAll('.geometry');
    geometryElements.forEach((resultElement, index) => {
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
    //   queryParams: { geometry: topElement },
    // });
    if (distanceToBottom < 200) {
      throttled(fetchNext);
    }
  },
  100,
  { maxWait: 500 }
);

const enhance = compose(
  withRouter,
  withGeometries,
  displayLoadingState,
  withHandlers({
    fetchNext: ({
      data: {
        allGeometries: { loading, pageInfo },
        skip,
        limit,
        variables,
        fetchMore,
      },
    }) => () => {
      if (!pageInfo.hasNextPage) return;
      if (loading) return;
      const pageInput = clone(variables.pageInput);
      pageInput.skip = pageInfo.skip + pageInfo.limit;
      fetchMore({
        variables: {
          pageInput: pageInput,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const previousGeometries = previousResult.allGeometries;
          const newGeometries = fetchMoreResult.allGeometries;
          newGeometries.geometries = [
            ...previousGeometries.geometries,
            ...newGeometries.geometries,
          ];
          return {
            // By returning `cursor` here, we update the `fetchMore` function
            // to the new cursor.
            // cursor: newCursor,
            skip: skip,
            limit: limit,
            allGeometries: newGeometries,
          };
        },
      });
    },
  }),
  mapProps(({ data, location, history, fetchNext }) => ({
    fetchNext,
    geometries: data.allGeometries.geometries,
    locationPathname: location.pathname,
    mutationVariables: data.variables,
    queryString: location.search,
    replaceState: history.replace,
    totalCount: data.allGeometries.totalCount,
    hasNextPage: data.allGeometries.pageInfo.hasNextPage,
    loadingGeometries: data.loading,
  })),
  withState('position', 'setPosition', 0),
  withHandlers({
    scroll: ({ setPosition, fetchNext }) => () =>
      onScroll({
        setPosition,
        fetchNext,
      }),
    openSearchDrawer: () => () => {
      return window.toggleSearchDrawer ? window.toggleSearchDrawer() : null;
    },
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

const GeometrySearchPure = ({
  geometries,
  totalCount,
  hasNextPage,
  openSearchDrawer,
  loadingGeometries,
  position,
}) => (
  <AppLayout
    mobileOnlyToolbar
    title="Geometries"
    toolbarContent={<SearchDrawerToggle onClick={openSearchDrawer} />}
    appContent={
      <GeometrySearchContainer>
        <Helmet>
          <title>geometry search | atoms+bits</title>
          <meta
            name="description"
            content="search for molecular geometries on atoms+bits"
          />
        </Helmet>
        <GeometrySearchContent>
          {geometries.length === 0 ? (
            <h2 style={{ fontFamily: 'Space Mono, monospace' }}>
              {`No geometries found :'(`}
            </h2>
          ) : null}
          {geometries.map((geometry) => (
            <GeometryCard
              className="geometry"
              key={geometry.id}
              geometry={geometry}
            />
          ))}
          <div style={{ display: 'block', height: 45, marginBottom: 20 }}>
            {hasNextPage ? (
              <CircularProgress color="secondary" thickness={5} />
            ) : null}
          </div>
        </GeometrySearchContent>
        <SearchDrawer key="search-drawer" />
        <ResultNavigator
          hasDrawer
          currentResult={position}
          resultCount={totalCount}
        />
      </GeometrySearchContainer>
    }
  />
);
GeometrySearchPure.propTypes = {
  totalCount: PropTypes.number.isRequired,
  openSearchDrawer: PropTypes.func.isRequired,
  geometries: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadingGeometries: PropTypes.bool.isRequired,
  position: PropTypes.number.isRequired,
  hasNextPage: PropTypes.bool,
};

const GeometrySearch = enhance(GeometrySearchPure);

export { GeometrySearch };
export default GeometrySearch;
