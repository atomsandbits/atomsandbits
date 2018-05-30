import styled from 'styled-components';
// import { Link } from 'react-router-dom';
import { breakpoints } from '/both/imports/theme';

export const ProjectContainer = styled.div``;

export const ProjectContent = styled.div`
  padding: 0 15px;
  max-width: 1000px;
  margin: 0 auto 30px;
  @media (min-width: ${breakpoints.md}) {
    margin: 40px auto 30px;
  }
`;
