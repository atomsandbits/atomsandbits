import styled from 'styled-components';
import Button from 'material-ui/Button';
import { colors } from '/client/imports/theme';

export const DropdownContainer = styled.div``;

export const LabelButton = styled(Button)`
  && {
    color: rgba(255, 82, 82, 0.5);
    padding: 20px 16px;
    text-transform: initial;
    width: 100%;
    transition: background-color 400ms;
    &:hover {
      background-color: rgba(0, 0, 0, 0.03);
    }
    > span {
      display: block;
      text-align: left;
    }
  }
`;

export const LabelText = styled.div`
  && {
    color: ${colors.text.secondary};
    display: block;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.46429em;
  }
`;

export const LabelValue = styled.div`
  && {
    color: ${colors.text.default};
    display: block;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5em;
  }
`;

// const styles = theme => ({
//   listItemHeader: {
//     color: 'rgba(0, 0, 0, 0.54)',
//     fontSize: '0.875rem'
//   },
//   listItemText: {
//     color: 'black',
//     fontSize: '1rem'
//   }
// });

// export default styles;
