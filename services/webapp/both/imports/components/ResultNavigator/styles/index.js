import styled from 'styled-components';

import { colors, breakpoints } from '/both/imports/theme';

export const ResultNavigatorContainer = styled.div`
  align-items: center;
  background-color: ${colors.background.light};
  bottom: 0;
  color: ${colors.primary};
  cursor: pointer;
  display: flex;
  height: 35px;
  justify-content: center;
  position: fixed;
  right: 15px;
  width: 145px;
  @media (min-width: ${breakpoints.md}) {
    right: ${({ hasDrawer }) => (hasDrawer ? '285px' : '15px')};
  }
`;

export const BackgroundFill = styled.div`
  background-color: ${colors.primary};
  height: 100%;
  left: 0;
  opacity: 0.25;
  position: absolute;
  top: 0;
  width: ${({ width }) => width}%;
  transition: width 300ms;
`;
