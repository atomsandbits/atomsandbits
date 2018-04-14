import styled from 'styled-components';
import _Drawer from 'material-ui/Drawer';
import { colors, sizes } from '/client/imports/theme';

export const AppFrame = styled.div`
  display: flex;
  width: 100%;
`;
export const Content = styled.main`
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
