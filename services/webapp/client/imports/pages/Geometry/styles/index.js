import styled from 'styled-components';
import { Link as _Link } from 'react-router-dom';
import Chip from 'material-ui/Chip';
import _ErrorIcon from 'react-icons/lib/fa/exclamation-circle';
import { CircularProgress } from 'material-ui/Progress';
import _SpeckRenderer from '/client/imports/components/SpeckRenderer';
import _Expandable from '/client/imports/components/Expandable';
import { colors, fonts, breakpoints } from '/client/imports/theme';

export const GeometryPageContainer = styled.div`
  height: auto;
  min-height: 100%;
  background-color: #f7f9fa;
  @media (min-width: ${breakpoints.md}) {
    height: 100%;
  }
`;

export const GeometryPageContent = styled.div`
  box-sizing: border-box;
  display: flex;
  margin: 0 auto;
  height: 100%;
  text-align: center;
  flex-direction: column-reverse;
  @media (min-width: ${breakpoints.md}) {
    flex-direction: row;
  }
`;

export const ColumnContainer = styled.div`
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 20px;
  @media (min-width: ${breakpoints.md}) {
    height: 100%;
    width: 50%;
    overflow: auto;
  }
`;

export const ColumnContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  @media (min-width: ${breakpoints.lg}) {
    padding-top: 20px;
  }
`;

export const FlatCard = styled.div`
  border: 1px solid ${colors.text.default};
  max-height: 400px;
  overflow: auto;
  padding: 20px;
  text-align: left;
`;
export const RaisedCard = FlatCard.extend`
  background-color: white;
  border: none;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`;
export const CardTitle = styled.div`
  font-family: ${fonts.header};
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.02rem;
  margin-bottom: 10px;
  text-align: left;
  width: 100%;
`;
export const Expandable = styled(_Expandable)`
  && {
    > div {
      user-select: auto;
    }
  }
`;
export const CardPropertyLabel = styled.div`
  flex-grow: 1;
  font-size: 0.8rem;
  font-weight: 500;
  padding-bottom: 15px;
  padding-left: 20px;
  text-align: left;
`;
export const CardPropertyRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px 0;
  width: 100%;
`;
export const LoadIndicator = styled(CircularProgress)`
  && {
    color: ${colors.secondary};
    padding: 5px;
  }
`;
export const ErrorIcon = styled(_ErrorIcon)`
  color: ${colors.secondary};
  font-size: 1.6rem;
`;
export const CardProperty = styled.div`
  font-family: ${fonts.monospace};
  font-size: ${props => (props.small ? '0.8rem' : '1.2rem')};
  max-height: ${props => (props.tall ? '400px' : '300px')};
  margin: 0 auto;
  overflow: auto;
  user-select: all;
  white-space: pre;
`;

/* ~~~~~~~ Calculation Column ~~~~~~~ */
export const GeometryCalculationColumn = ColumnContainer.extend`
  padding-bottom: 40px;
  & > div {
    max-width: 800px;
  }
`;

/* ~~~~~~~ Information Column ~~~~~~~ */
export const GeometryInformationColumn = ColumnContainer.extend``;
export const SpeckRenderer = styled(_SpeckRenderer)``;

export const Links = RaisedCard.extend`
  margin-bottom: 20px;
`;
export const Link = styled(_Link)`
  display: inline-block;
  padding: 10px 20px;
  color: ${colors.primary};
`;
export const AtomicCoordsContainer = RaisedCard.extend``;
export const AtomicCoords = styled.div`
  font-family: ${fonts.monospace};
  font-size: 0.8rem;
  margin: 0 auto;
  max-height: 350px;
  overflow: auto;
  padding: 0 20px;
  user-select: all;
  white-space: pre;
  width: 90%;
  width: fit-content;
`;
