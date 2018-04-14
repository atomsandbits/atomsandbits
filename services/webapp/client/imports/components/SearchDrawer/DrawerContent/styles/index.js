import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Range as _Range } from 'rc-slider';
import _Button from 'material-ui/Button';
import _SearchIcon from 'material-ui-icons/Search';

import { colors, fonts, sizes } from '/client/imports/theme';

export const DrawerContentContainer = styled.div`
  background-color: ${colors.background.default};
  border-left: 1px solid rgba(0, 0, 0, 0.14);
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: ${sizes.drawer};
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.14);
  min-height: 64px;
`;
export const SearchIcon = styled(_SearchIcon)`
  color: rgba(0, 0, 0, 0.54);
  margin-left: 24px;
  height: 24px;
  width: 24px;
`;
export const SearchInput = styled.input`
  border: none;
  outline: none;
  padding-left: 12px;
  font-size: 15px;
  font-weight: 500;
  align-self: stretch;
`;

export const SortByContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
`;
export const SortDirectionButton = styled(_Button)`
  && {
    color: ${colors.secondary};
    cursor: pointer;
    position: absolute;
    right: 0px;
    top: 0px;
    height: 100%;
    &:hover {
      background-color: rgba(0, 0, 0, 0.03);
    }
    svg {
      color: ${colors.text.default};
    }
  }
`;

export const Range = styled(_Range)`
  && {
    margin: 5px auto;
    width: 90%;
  }
`;

export const SliderInputsContainer = styled.div`
  display: flex;
`;
export const SliderInput = styled.input`
  width: 100%;
`;

export const MassSliderContainer = styled.div`
  width: 90%;
  margin: 20px auto;
`;
