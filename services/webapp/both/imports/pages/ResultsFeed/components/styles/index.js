import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import _EmpiricalFormula from '/both/imports/components/EmpiricalFormula';

import { colors } from '/both/imports/theme';

export const CardLink = styled(Link)`
  color: inherit;
`;
export const Card = styled.div`
  align-items: center;
  border: 1px solid gainsboro;
  cursor: pointer;
  display: inline-flex;
  height: 250px;
  justify-content: center;
  margin: 20px 30px;
  padding: 15px;
  position: relative;
  text-align: left;
  width: 250px;
`;
export const CardTopLeft = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
export const EmpiricalFormula = styled(_EmpiricalFormula)`
  font-size: 0.8rem;
`;
export const InformationalTags = styled.div`
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  font-weight: 500;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const CardTopRight = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
export const LoadIndicator = styled(CircularProgress)`
  && {
    color: ${colors.secondary};
  }
`;

export const ImageContainer = styled.div`
  height: 55%;
  width: 55%;
  position: relative;
`;
export const PlaceholderImage = styled.div`
  height: 100%;
  position: absolute;
  opacity: ${({ loading }) => (loading ? 1 : 0)};
  transition: opacity 300ms linear;
  svg {
    height: 100%;
    width: 100%;
  }
`;
export const SystemImage = styled.img`
  height: 100%;
  position: absolute;
  opacity: ${({ loading }) => (loading ? 0 : 1)};
  transition: opacity 300ms linear;
`;

export const TimeInformation = styled.div`
  position: absolute;
  left: 10px;
  bottom: 10px;
  color: ${colors.text.light};
  font-size: 0.6rem;
`;
export const InformationalDots = styled.div`
  bottom: 10px;
  position: absolute;
  right: 10px;
`;
export const DotContainer = styled.div`
  display: inline-block;
  padding: 5px;
`;
export const Dot = styled.span`
  background-color: ${(props) => colors[props.color]};
  border-radius: 100%;
  display: block;
  height: 10px;
  width: 10px;
`;
