import styled from 'styled-components';

export const SpeckRendererContainer = styled.div`
  height: 100%;
  div {
    height: 100%;
  }
`;

export const SpeckCanvasContainer = styled.div`
  text-align: center;
  overflow: hidden;
  user-select: none;
  max-height: 375px;
  height: 100%;
`;

export const SpeckCanvas = styled.canvas`
  width: 100%;
`;
