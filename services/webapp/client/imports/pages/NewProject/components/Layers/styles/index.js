import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import DeleteIcon from 'react-icons/lib/fa/times-circle';

import DropdownMenu from '/client/imports/components/DropdownMenu';

import { colors } from '/client/imports/theme';

export const LayerContainer = styled(Card)`
  && {
    margin: 15px 0;
    padding: 70px 15px 15px;
    position: relative;
    box-shadow: none;
    border: 1px solid gainsboro;
  }
`;

export const LayerContent = styled.div``;

export const LayerTypeDropdown = styled(DropdownMenu)`
  && {
    position: absolute;
    top: 0;
    left: 0;
    width: auto;
    > button {
      padding: 12px 16px;
      div:nth-of-type(1) {
        font-size: 12px;
      }
      div:nth-of-type(2) {
        font-size: 16px;
      }
    }
  }
`;

export const DeleteLayerIcon = styled(DeleteIcon)`
  color: ${colors.secondary};
  cursor: pointer;
  font-size: 24px;
  padding: 15px;
  position: absolute;
  right: 0;
  top: 0;
`;

export const OutputType = styled.div`
  margin: 15px 10px 0 auto;
  width: fit-content;
`;
