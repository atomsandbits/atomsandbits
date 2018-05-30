import styled from 'styled-components';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { sizes } from '/both/imports/theme';

export const AppFrame = styled.div`
  display: flex;
  width: 100%;
`;
export const Content = styled.main`
  width: 100%;
`;
export const Drawer = styled(SwipeableDrawer)`
  overflow: auto;
  min-width: ${sizes.drawer};
  & > div {
    border: none;
  }
`;
