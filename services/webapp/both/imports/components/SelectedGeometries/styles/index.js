import styled from 'styled-components';

import { colors } from '/both/imports/theme';

export const SelectedGeometriesContainer = styled.div`
  position: fixed;
  top: 0;
  right: 285px;
  width: 145px;
  height: 35px;
  color: ${colors.primary};
  background-color: ${colors.background.light};
  cursor: pointer;
`;
