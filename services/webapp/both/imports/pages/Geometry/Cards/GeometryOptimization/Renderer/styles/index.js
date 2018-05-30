import styled from 'styled-components';
// import { Link as _Link } from 'react-router-dom';
// import Chip from '@material-ui/core/Chip';
// import _SpeckRenderer from '/both/imports/components/SpeckRenderer';
import { fonts, breakpoints } from '/both/imports/theme';

export const RendererContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
export const Column = styled.div`
  width: 50%;
  box-sizing: border-box;
  max-height: 350px;
  max-width: 350px;
`;
export const RendererRow = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  user-select: all;
  @media (min-width: ${breakpoints.md}) {
    flex-direction: column-reverse;
  }
  @media (min-width: 1600px) {
    flex-direction: row;
  }
`;
export const SpeckContainer = Column.extend`
  display: none;
  flex-shrink: 0;
  height: 160px;
  width: 160px;
  margin: auto;
  @media (min-width: ${breakpoints.sm}) {
    display: block;
  }
`;
export const Geometry = styled.div`
  box-sizing: border-box;
  font-family: ${fonts.monospace};
  font-size: 0.8rem;
  height: 100%;
  margin: 0 auto;
  overflow: auto;
  padding: 0 15px;
  text-align: left;
  white-space: pre;
  width: 100%;
`;
