import styled from 'styled-components';
import FaCloud from 'react-icons/lib/fa/cloud';
import ArrowRight from 'react-icons/lib/md/arrow-forward';
import { Link } from 'react-router-dom';

export const VisualizeIcons = styled.div`
  display: flex;
  color: #36f1cd;
  justify-content: space-between;
  font-size: 4rem;
  margin: 5.25rem 0 2rem;
  @media (max-width: 767px) {
    font-size: 2.5rem;
    margin: 3.25rem 0 0;
  }
`;

export const SplashTextContainer = styled.div`
  padding: 30px;
`;

export const SectionTitle = styled.div`
  font-family: Poppins;
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 30px;
  letter-spacing: 0.05rem;
`;
export const Section = styled.div`
  padding: 60px 0 90px;
  text-align: center;
`;

export const FirstSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  min-height: 500px;
  max-height: 1000px;
`;
export const Title = styled.div`
  font-family: Poppins;
  color: #ff5252;
  font-size: 3rem;
  font-weight: bold;
`;
export const Description = styled.div`
  font-family: Poppins;
  color: #404040;
  font-size: 3.25rem;
  font-weight: bold;
`;
export const StartLink = styled.a`
  font-family: Poppins;
  float: right;
  font-weight: bold;
  letter-spacing: 0.1rem;
  color: #0070e0;
  font-size: 3rem;
`;

export const SecondSection = Section.extend`
  background-color: #404040;
  color: white;
`;
export const ExploreSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30px;
  @media (min-width: 1280px) {
    align-items: initial;
    justify-content: center;
    flex-direction: row;
  }
`;
export const Exploration = styled.div`
  max-width: 600px;
  width: 100%;
`;
export const ExplorationTitle = styled.div`
  color: #36F1CD;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 30px;
`;
export const ExplorationDescription = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 40px;
`;
export const LargeSystemImage = styled.img`
  margin-top: -30px;
  width: 100%;
  max-width: 400px;
`;

export const ThirdSection = Section.extend``;
export const MethodsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30px;
  text-align: left;
  font-size: 1.4rem;
`;
export const MethodContainer = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  @media (min-width: 960px) {
    flex-direction: row;
  }
`;
export const MethodType = styled.div`
  flex-grow: 1;
  font-weight: 600;
`;
export const Methods = styled.div`
  display: flex;
  margin-top: 15px;
  @media (min-width: 960px) {
    margin-top: 0;
  }
`;
export const Method = styled.div`
  padding-right: 10px;
`;

export const FourthSection = Section.extend`
  background-color: #0070e0;
  color: white;
`;
export const PricingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30px;
  @media (min-width: 1280px) {
    align-items: initial;
    justify-content: center;
    flex-direction: row;
  }
`;
export const PricingSection = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 20px;
  text-align: left;
  @media (min-width: 1280px) {
    border: none;
    margin: 0 20px;
    padding: 0 30px;
  }
`;
export const PricingSectionTitle = styled.div`
  font-weight: 600;
  font-size: 2rem;
  font-family: Poppins;
  margin-bottom: 20px;
`;
export const PriceContainer = styled.div`
  display: flex;
  font-size: 1.4rem;
  font-weight: 500;
  padding: 5px 0;
`;
export const PriceLabel = styled.div`
  flex-grow: 1;
  font-weight: 600;
`;
export const Price = styled.div``;

export const FifthSection = Section.extend`
  text-align: center;
`;
export const ProfileContainerStyle = styled.div`
  align-items: center;
  cursor: default;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding: 10px 30px;

  @media (min-width: 600px) {
    flex-direction: row;
  }
  @media (min-width: 1280px) {
    display: inline-block;
  }
  img {
    border-radius: 100%;
    height: 150px;
    width: 150px;
    margin: 1rem;
    object-fit: cover;
    @media (min-width: 960px) {
      height: 200px;
      width: 200px;
      margin: 2rem 4rem;
    }
  }
`;
export const Handle = styled.a`
  color: #0070e0;
`;

export const Footer = styled.div`
  min-height: 150px;
  background-color: #404040;
`;
