import styled from 'styled-components';
import _TextField from 'material-ui/TextField';

export const OptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
`;

export const OptionContainer = styled.div`
  flex-grow: 1;
  label {
    white-space: nowrap;
  }
`;

export const TextField = styled(_TextField)`
  && {
    max-width: 100px;
    margin: 18px;
  }
`;
