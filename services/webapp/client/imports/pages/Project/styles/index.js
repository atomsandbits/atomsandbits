import styled from 'styled-components';
import { Link } from 'react-router-dom';
import _ImageIcon from 'material-ui-icons/Image';
import _BurstModeIcon from 'material-ui-icons/BurstMode';
import { colors, fonts } from '/client/imports/theme';

export const ProjectContainer = styled.div``;

export const ProjectContent = styled.div`
  margin: 40px auto;
  max-width: 1000px;
`;

export const SystemTypesContainer = styled.div`
  text-align: center;
`;
export const MoleculeIcon = styled(_ImageIcon)`

`;

export const GroupIcon = styled(_BurstModeIcon)`

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
