import styled from 'styled-components';
import _Drawer from 'material-ui/Drawer';
import { colors, sizes } from '/client/imports/theme';

export const RootDiv = styled.div`
  height: 100%;
  overflow: hidden;
  width: 100%;
  z-index: 1;
`;
export const AppFrame = styled.div`
  display: flex;
  height: 100%;
  position: relative;
  width: 100%;
`;
export const Content = styled.main`
  height: 100%;
  overflow: auto;
  width: 100%;
`;
export const Drawer = styled(_Drawer)`
  height: 100%;
  overflow: auto;
  min-width: ${sizes.drawer};
  & > div {
    border: none;
  }
`;
