import styled from 'styled-components';
import { Link as _Link } from 'react-router-dom';
import Chip from 'material-ui/Chip';
import _SpeckRenderer from '/client/imports/components/SpeckRenderer';
import { colors, fonts, breakpoints } from '/client/imports/theme';

export const RendererContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  fle
`;
export const Column = styled.div`
  width: 50%;
  box-sizing: border-box;
  max-height: 350px;
  max-width: 350px;
`;
export const Geometry = styled.div`
  height: 100%;
  overflow: auto;
  font-family: ${fonts.monospace};
  font-size: 0.8rem;
  white-space: pre;
  text-align: left;
`;
