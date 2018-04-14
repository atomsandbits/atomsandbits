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
  onlyUpdateForPropTypes,
} from 'recompose';
import { LinearProgress } from 'material-ui/Progress';
import queryParser from 'query-string';
import debounce from 'lodash/debounce';

import AppLayout from '/client/imports/components/AppLayout';
import ResultNavigator from '/client/imports/components/ResultNavigator';
import SearchDrawer from '/client/imports/components/SearchDrawer';
import SelectedGeometries from '/client/imports/components/SelectedGeometries';

import withGeometries from './withGeometries';
import GeometryCard from './components/GeometryCard';
import {
  GeometrySearchContainer,
  GeometrySearchContent,
  SearchDrawerToggle,
} from './styles';

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
  300,
  { maxWait: 2000 }
);

const Loading = props => (
  <AppLayout
    mobileOnlyToolbar
    title="Geometry Search"
    appContent={
      <GeometrySearchContainer>
        <LinearProgress />
      </GeometrySearchContainer>
    }
  />
);

const displayLoadingState = branch(
  ({ data }) => data.loading && !data.allGeometries,
  renderComponent(Loading)
);

const onScroll = debounce(
  ({ locationPathname, queryString, replaceState }) => {
    const scrollPosition = window.pageYOffset;
    let topElement = -1;
    document.querySelectorAll('.geometry').forEach((resultElement, index) => {
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
      queryParams: { geometry: topElement },
    });
  },
  100,
  { maxWait: 2000 }
);

const enhance = compose(
  withRouter,
  withGeometries,
  displayLoadingState,
  mapProps(({ data, location, history }) => ({
    geometries: data.allGeometries.geometries,
    totalCount: data.allGeometries.totalCount,
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
    openSearchDrawer: () => () => {
      return window.toggleSearchDrawer ? window.toggleSearchDrawer() : null;
    },
  }),
  lifecycle({
    componentDidMount() {
      const { scroll } = this.props;
      document.title = 'geometry search | cloudszi';
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

const GeometrySearchPure = ({
  geometries,
  totalCount,
  openSearchDrawer,
  queryParams,
}) => (
  <AppLayout
    mobileOnlyToolbar
    title="Geometries"
    toolbarContent={<SearchDrawerToggle onClick={openSearchDrawer} />}
    appContent={
      <GeometrySearchContainer>
        <GeometrySearchContent>
          {geometries.length === 0 ? (
            <h2 style={{ fontFamily: 'Space Mono, monospace' }}>
              No geometries found :'(
            </h2>
          ) : null}
          {geometries.map(geometry => (
            <GeometryCard
              className="geometry"
              key={geometry.id}
              geometry={geometry}
            />
          ))}
        </GeometrySearchContent>
        <SearchDrawer key="search-drawer" />
        <ResultNavigator
          hasDrawer
          currentResult={Number(queryParams.geometry) || 0}
          resultCount={totalCount}
        />
      </GeometrySearchContainer>
    }
  />
);
GeometrySearchPure.propTypes = {
  queryParams: PropTypes.object.isRequired,
  totalCount: PropTypes.number.isRequired,
  openSearchDrawer: PropTypes.func.isRequired,
  geometries: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const GeometrySearch = enhance(GeometrySearchPure);

export { GeometrySearch };
export default GeometrySearch;
