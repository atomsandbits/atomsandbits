import styled from 'styled-components';
import _CancelIcon from 'material-ui-icons/Cancel';
import _UpIcon from 'material-ui-icons/ArrowUpward';
import _DownIcon from 'material-ui-icons/ArrowDownward';
import _SearchIcon from 'material-ui-icons/Search';
import DropdownMenu from '/client/imports/components/DropdownMenu';

import { colors, breakpoints, fonts } from '/client/imports/theme';

export const ResultsFeedContainer = styled.div``;

/* ~~~~~~~~~ Header Content ~~~~~~~~~ */
export const HeaderContent = styled.div`
  && {
    display: flex;
    height: 100%;
    width: 100%;
  }
`;
/* Sorter */
export const SortContainer = styled.div`
  cursor: pointer;
  display: flex;
  margin-right: 30px;
  width: 200px;
`;
export const SortDropdown = styled(DropdownMenu)`
  flex-grow: 1;
  width: 200px;
`;
export const SortLabel = styled.div`
  align-items: center;
  border: 1px solid gainsboro;
  display: flex;
  height: 100%;
  padding: 0 20px;
`;
export const SortDirection = styled.div`
  align-items: center;
  justify-content: center;
  border: 1px solid gainsboro;
  border-left: none;
  display: flex;
  height: 100%;
  min-width: 45px;
`;
export const DownIcon = styled(_DownIcon)``;
export const UpIcon = styled(_UpIcon)``;

/* Tags */
export const TagContainer = styled.div`
  cursor: pointer;
  display: flex;
  width: 200px;
`;
export const TagDropdown = styled(DropdownMenu)`
  flex-grow: 1;
  width: 200px;
`;

/* Search */
export const SearchContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 0 0 auto;
  position: relative;
`;
export const SearchIcon = styled(_SearchIcon)`
  color: colors.text.default;
  margin-right: -35px;
  z-index: 1;
`;
export const SearchInput = styled.input`
  border: 1px solid gainsboro;
  font-size: 1.2rem;
  outline: none;
  padding: 10px 40px;
  transition: border 400ms;
  &:focus {
    border: 1px solid skyblue;
  }
`;
export const CancelIcon = styled(_CancelIcon)`
  padding: 10px;
  cursor: pointer;
  color: colors.text.default;
  margin-left: -45px;
  z-index: 1;
`;
