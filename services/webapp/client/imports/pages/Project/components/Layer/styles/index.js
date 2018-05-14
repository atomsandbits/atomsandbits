import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CircularProgress } from 'material-ui/Progress';
import { colors } from '/client/imports/theme';

export const LayerContainer = styled.div`
  && {
    margin: 15px 0;
    padding: 60px 15px 15px;
    position: relative;
    box-shadow: none;
    border: 1px solid gainsboro;
    box-sizing: border-box;
  }
`;

export const LayerContent = styled.div`
  padding: 0 25px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
`;

export const Parameters = styled.div`
  font-size: 16px;
`;
export const LeftSide = styled.div`
  display: inline-block;
  min-width: 256px;
  flex-grow: 1;
`;
export const RightSide = styled.div`
  display: inline-block;
  min-width: 300px;
  flex-grow: 1;
`;

export const GeometryLink = styled(Link)``;

export const ResultContainer = styled(Link)`
  min-width: 128px;
  width: min-content;
`;
export const SystemImage = styled.img`
  display: block;
  margin: 0 auto;
  width: 128px;
`;

export const TopLeft = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 12px 16px;
  div:nth-of-type(1) {
    color: rgba(0, 0, 0, 0.54);
    font-size: 12px;
  }
  div:nth-of-type(2) {
    color: ${colors.text.default};
    line-height: 1.5em;
    font-weight: 400;
    font-size: 16px;
  }
`;
export const TopRight = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
export const LoadingIndicator = styled(CircularProgress)`
  && {
    color: ${colors.secondary};
  }
`;
