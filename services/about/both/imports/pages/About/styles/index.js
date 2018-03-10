import styled from 'styled-components';
import FaCloud from 'react-icons/lib/fa/cloud';
import { Link } from 'react-router-dom';

export const VisualizeIcons = styled.div`
    display: flex;
    color: #36F1CD;
    justify-content: space-between;
    font-size: 4rem;
    margin: 5.25rem 0 2rem;
    @media (max-width: 767px) {
        font-size: 2.5rem;
        margin: 3.25rem 0 0;
    }
`

export const SplashTextContainer = styled.div`
  padding: 30px;
`;
export const Title = styled.div`
  font-family: Poppins;
  color: #FF5252;
  font-size: 3rem;
  font-weight: bold;
`;
export const Description = styled.div`
  font-family: Poppins;
  color: #454545;
  font-size: 3.25rem;
  font-weight: bold;
`;
export const Logo = styled(FaCloud)`
  position: absolute;
  top: 20px;
  left: 30px;
  font-size: 3rem;
  color: white;
  stroke: #0070e0;
  stroke-width: 2px;
  padding: 5px;
`;
export const FirstSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  max-height: 1000px;
`

export const SecondSection = styled.div`
  background-color: #0070e0;
  height: 600px;
`;

export const ThirdSection = styled.div`
  height: 700px;
`;

export const FourthSection = styled.div`
  background-color: #F7F9FA;
  height: 400px;
`;

export const FifthSection = styled.div`
  height: 600px;
`;

export const Footer = styled.div`
  min-height: 150px;
  background-color: #454545;
`
