import styled from 'styled-components';
import _Drawer from '@material-ui/core/Drawer';
import { sizes } from '/client/imports/theme';

export const AppFrame = styled.div`
  display: flex;
  width: 100%;
`;
export const Content = styled.main`
  width: 100%;
`;
export const Drawer = styled(_Drawer)`
  overflow: auto;
  min-width: ${sizes.drawer};
  & > div {
    border: none;
  }
`;
