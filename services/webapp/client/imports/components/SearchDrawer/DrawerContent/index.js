import React from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  mapProps,
  withHandlers,
  defaultProps,
  lifecycle,
  withState,
  onlyUpdateForPropTypes,
} from 'recompose';
import { withRouter } from 'react-router-dom';
import debounce from 'lodash/debounce';
import queryParser from 'query-string';
import DownArrowIcon from '@material-ui/icons/ArrowDownward';
import UpArrowIcon from '@material-ui/icons/ArrowUpward';
import 'rc-slider/assets/index.css';

import Dropdown from '/client/imports/components/DropdownMenu';
import {
  DrawerContentContainer,
  MassSliderContainer,
  Range,
  SearchContainer,
  SearchIcon,
  SearchInput,
  SliderInput,
  SliderInputsContainer,
  SortByContainer,
  SortDirectionButton,
} from './styles';

const sortOptions = [
  {
    value: 'created',
    prettyName: 'latest',
  },
  {
    value: 'mass',
    prettyName: 'mass',
  },
];

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
  { maxWait: 3000 }
);

const enhance = compose(
  withRouter,
  defaultProps({
    maxMass: 10000,
    closeDrawer: () => {},
  }),
  mapProps(({ location, history, maxMass, closeDrawer }) => ({
    locationPathname: location.pathname,
    queryString: location.search,
    queryParams: getQueryParams({ queryString: location.search }),
    replaceState: history.replace,
    maxMass,
    closeDrawer,
  })),
  withState(
    'massRange',
    'setMassRange',
    ({ queryParams, maxMass }) =>
      queryParams.mass
        ? queryParams.mass.map((value) => Number(value))
        : [0, maxMass]
  ),
  withState(
    'sort',
    'setSort',
    ({ queryParams }) => (queryParams.sort ? queryParams.sort : 'mass')
  ),
  withState(
    'direction',
    'setDirection',
    ({ queryParams }) =>
      queryParams.direction ? queryParams.direction : 'desc'
  ),
  withState(
    'search',
    'setSearch',
    ({ queryParams }) => (queryParams.search ? queryParams.search : '')
  ),
  withHandlers({
    onSearchInput: ({ setSearch }) => (event) => setSearch(event.target.value),
    toggleDirection: ({ direction, setDirection }) => () =>
      direction === 'asc' ? setDirection('desc') : setDirection('asc'),
    setMassMin: ({ massRange, setMassRange }) => (event) => {
      const minimum = event.target.value > 0 ? event.target.value : 0;
      const maximum = massRange[1] > minimum ? massRange[1] : minimum;
      setMassRange([minimum, maximum]);
    },
    setMassMax: ({ massRange, setMassRange, maxMass }) => (event) => {
      const maximum =
        event.target.value < maxMass ? event.target.value : maxMass;
      const minimum = massRange[0] < maximum ? massRange[0] : maximum;
      setMassRange([minimum, maximum]);
    },
    setQueryParams: ({
      locationPathname,
      queryString,
      replaceState,
      sort,
      direction,
      massRange,
      search,
    }) => () =>
      setQueryParams({
        locationPathname,
        queryString,
        queryParams: {
          sort,
          direction,
          mass: massRange,
          search,
        },
        replaceState,
      }),
  }),
  lifecycle({
    componentDidMount() {
      const { setQueryParams } = this.props;
      setQueryParams();
    },
    componentDidUpdate() {
      const { setQueryParams } = this.props;
      setQueryParams();
    },
  }),
  onlyUpdateForPropTypes
);

const DrawerContentPure = ({
  direction,
  massRange,
  maxMass,
  onSearchInput,
  search,
  setMassMax,
  setMassMin,
  setMassRange,
  setSort,
  sort,
  toggleDirection,
}) => (
  <DrawerContentContainer>
    <SearchContainer>
      <SearchIcon />
      <SearchInput
        placeholder="formula"
        value={search}
        onChange={onSearchInput}
      />
    </SearchContainer>
    <SortByContainer>
      <Dropdown
        setValue={setSort}
        value={sort}
        label="Sorting"
        menuItems={sortOptions}
      />
      <SortDirectionButton onClick={toggleDirection}>
        {direction === 'asc' ? <DownArrowIcon /> : <UpArrowIcon />}
      </SortDirectionButton>
    </SortByContainer>
    <MassSliderContainer>
      Mass
      <Range
        min={0}
        max={maxMass}
        value={massRange.map((massValue) => Number(massValue))}
        defaultValue={massRange.map((massValue) => Number(massValue))}
        onChange={setMassRange}
        pushable={true}
      />
      <SliderInputsContainer>
        <SliderInput value={massRange[0]} type="number" onChange={setMassMin} />
        <SliderInput value={massRange[1]} type="number" onChange={setMassMax} />
      </SliderInputsContainer>
    </MassSliderContainer>
  </DrawerContentContainer>
);
DrawerContentPure.propTypes = {
  closeDrawer: PropTypes.func.isRequired,
  direction: PropTypes.string.isRequired,
  locationPathname: PropTypes.string.isRequired,
  massRange: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
  ).isRequired,
  maxMass: PropTypes.number.isRequired,
  onSearchInput: PropTypes.func.isRequired,
  queryString: PropTypes.string.isRequired,
  replaceState: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  setMassMax: PropTypes.func.isRequired,
  setMassMin: PropTypes.func.isRequired,
  setMassRange: PropTypes.func.isRequired,
  setSort: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  toggleDirection: PropTypes.func.isRequired,
};

const DrawerContent = enhance(DrawerContentPure);

export { DrawerContent };
export default DrawerContent;
