import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CircularProgress } from 'material-ui/Progress';
import _EmpiricalFormula from '/client/imports/components/EmpiricalFormula';

import { colors, breakpoints, fonts } from '/client/imports/theme';

export const ResultsFeedContainer = styled.div``;

export const ResultsFeedContent = styled.div`
  text-align: center;
  @media (min-width: ${breakpoints.xl}) {
    margin: 0 30px;
  }
`;
