import React from 'react';
import CalculatorIcon from 'react-icons/lib/go/file-binary';
import CubeIcon from 'react-icons/lib/fa/cubes';
import SaveIcon from 'react-icons/lib/md/save';
import ListIcon from 'react-icons/lib/go/list-ordered';
import EyeIcon from 'react-icons/lib/go/eye';
import ChartIcon from 'react-icons/lib/fa/bar-chart';

import { NavigationBar } from '/both/imports/components/NavigationBar';
// import { Footer } from '/both/imports/components/Footer';
import {
  RootStyle,
  ContainerStyle,
  SmallSectionStyle,
  SpotlightCircle,
} from '/both/imports/styles';
import {
  FirstSection,
  SecondSection,
  ThirdSection,
  FourthSection,
  FifthSection,
  Logo,
  Title,
  Description,
  SplashTextContainer,
  Footer,
  VisualizeIcons,
} from './styles';

const About = () => (
  <RootStyle>
    <ContainerStyle>
      <FirstSection>
        <Logo />
        <SplashTextContainer>
          <Title>cloudszi</Title>
          <Description>molecular discovery at scale</Description>
        </SplashTextContainer>
      </FirstSection>
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
      <Footer />
    </ContainerStyle>
  </RootStyle>
);

export default About;
