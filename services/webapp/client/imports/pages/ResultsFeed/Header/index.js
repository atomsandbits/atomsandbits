import React from 'react';
import { compose } from 'recompose';

import BaseHeader from '/client/imports/components/Header';
import {
  CancelIcon,
  DownIcon,
  HeaderContent,
  SearchContainer,
  SearchIcon,
  SearchInput,
  SortContainer,
  SortDirection,
  SortDropdown,
  SortLabel,
  TagContainer,
  TagDropdown,
  UpIcon,
} from './styles';

const sortOptions = [
  {
    value: 'createdAt',
    prettyName: 'Created',
  },
  {
    value: 'calculationType',
    prettyName: 'Type',
  },
  {
    value: 'calculationMethod',
    prettyName: 'Method',
  },
];
const tagOptions = [
  {
    value: '',
    prettyName: '',
  },
  {
    value: 'calculations',
    prettyName: 'Calculations',
  },
  {
    value: 'projects',
    prettyName: 'Projects',
  },
  {
    value: 'starred',
    prettyName: 'Starred',
  },
  {
    value: 'researchGroup',
    prettyName: 'Research Group',
  },
];

const HeaderPure = ({
  search,
  setSearch,
  setSortBy,
  setSortDirection,
  setTag,
  sortBy,
  sortDirection,
  tag,
}) => (
  <BaseHeader
    content={
      <HeaderContent>
        <SortContainer>
          <SortDropdown
            value={sortBy}
            unsetValue={() => {
              setSortBy('');
            }}
            menuItems={sortOptions}
            setValue={setSortBy}
            labelElement={<SortLabel>{sortBy}</SortLabel>}
          />
          <SortDirection
            onClick={() => {
              setSortDirection(sortDirection * -1);
            }}
          >
            {sortDirection === -1 ? <DownIcon /> : <UpIcon />}
          </SortDirection>
        </SortContainer>
        <TagContainer>
          <TagDropdown
            value={tag}
            unsetValue={() => {
              setTag('');
            }}
            menuItems={tagOptions}
            setValue={setTag}
            labelElement={<SortLabel>{tag}</SortLabel>}
          />
        </TagContainer>
        <SearchContainer>
          <SearchIcon />
          <SearchInput
            value={search}
            onChange={event => setSearch(event.target.value)}
          />
          <CancelIcon />
        </SearchContainer>
      </HeaderContent>
    }
  />
);

const Header = compose()(HeaderPure);

export { Header };
export default Header;
