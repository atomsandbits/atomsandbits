import styled from 'styled-components';
import _AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import { colors, sizes, breakpoints } from '/client/imports/theme';

export const AppBarContainer = styled.div`
  height: 64px;
  position: relative;
`;
export const AppBar = styled(_AppBar)`
  && {
    transition: box-shadow 200ms;
    @media (min-width: ${breakpoints.lg}) {
      width: calc(100% - ${sizes.drawer});
    }
    & > div {
      background-color: ${colors.background.default};
    }
  }
`;
export const MenuButtonContainer = styled(IconButton)`
  && {
    @media (min-width: ${breakpoints.lg}) {
      display: none;
    }
  }
`;
