import styled from 'styled-components';
import _AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import { colors, sizes, breakpoints, fonts } from '/client/imports/theme';

export const AppLayoutContainer = styled.div``;
export const AppBar = styled(_AppBar)`
  && {
    background-color: ${colors.background.default};
    transition: box-shadow 200ms;
    @media (min-width: ${breakpoints.lg}) {
      display: ${(props) => (props.mobileonlytoolbar ? 'none' : 'default')};
      width: calc(100% - ${sizes.drawer});
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
export const Title = styled.div`
  font-family: ${fonts.header};
  color: #454545;
  font-weight: 500;
  font-size: 1.2rem;
  margin-top: 2px;
  letter-spacing: 0.03rem;
`;

export const App = styled.div`
  box-sizing: border-box;
  padding-top: 56px;
  @media (min-width: ${breakpoints.lg}) {
    height: ${(props) =>
      props.mobileOnlyToolbar ? '100%' : 'calc(100% - 64px)'};
    padding-top: ${(props) => (props.mobileOnlyToolbar ? '0px' : '64px')};
  }
`;
