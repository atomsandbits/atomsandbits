import styled from 'styled-components';
import _ExpansionPanel from 'material-ui/ExpansionPanel';
// import { colors, fonts, breakpoints } from '/client/imports/theme';

export const ExpansionPanel = styled(_ExpansionPanel)`
  && {
    & > div {
      padding: 12px 24px;
      & > div {
        max-width: 100%;
      }
    }
  }
`;
export const ExpandableCardSummary = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  max-width: 100%;
`;
export const ExpandableCardDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  max-width: 100%;
`;
