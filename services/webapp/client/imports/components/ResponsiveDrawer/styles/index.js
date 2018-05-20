import styled from 'styled-components';
// import _Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { colors, fonts, sizes } from '/client/imports/theme';

export const AppFrame = styled.div`
  display: flex;
  width: 100%;
`;
export const Content = styled.main`
  width: 100%;
`;
export const Drawer = styled(SwipeableDrawer)`
  height: 100%;
  overflow: auto;
  min-width: ${sizes.drawer};
  & > div {
    border: none;
  }
`;

export const ContactLink = styled.a`
  background-color: white;
  bottom: 50px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  color: ${colors.primary};
  font-family: ${fonts.header};
  font-size: 20px;
  font-weight: 500
  padding: 15px 20px;
  position: fixed;
  right: 30px;
  z-index: 1199;
`;
