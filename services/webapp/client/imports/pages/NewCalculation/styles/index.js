import styled from 'styled-components';
import Button from 'material-ui/Button';
import { breakpoints } from '/client/imports/theme';

export const NewCalculationContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto 30px;
  @media (min-width: ${breakpoints.md}) {
    margin: 40px auto 30px;
  }
`;

export const StartButton = styled(Button)`
  && {
    color: white;
    font-size: 1.1rem;
    text-transform: lowercase;
    letter-spacing: 0.1rem;
    padding: 5px 40px;
    font-weight: 600;
    margin-right: 15px;
    margin-top: 30px;
    margin-bottom: 30px;
    float: right;
    @media (min-width: ${breakpoints.sm}) {
      margin-right: 0;
    }
  }
`;
