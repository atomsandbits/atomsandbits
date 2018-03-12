import styled from 'styled-components';
import { Link as _Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import { colors, fonts, breakpoints } from '/client/imports/theme';

export const TagsContainer = styled.div`
  margin-bottom: 20px;
  text-align: left;
  display: flex;
`;
export const TagsScrollContainer = styled.div`
  flex-grow: 1;
  max-width: 70%;
  white-space: nowrap;
  overflow: auto;
`;
export const Tag = styled(Chip)`
  && {
    margin: 5px;
    svg {
      color: ${colors.secondary};
    }
  }
`;
export const TagInput = styled(TextField)`
  && {
    align-self: flex-end;
    width: 30%;
  }
`;