import React from 'react';
import ReactDom from 'react-dom';
import { compose, lifecycle } from 'recompose';
import CalculatorIcon from 'react-icons/lib/go/file-binary';
import CubeIcon from 'react-icons/lib/fa/cubes';
import SaveIcon from 'react-icons/lib/md/save';
import ListIcon from 'react-icons/lib/go/list-ordered';
import EyeIcon from 'react-icons/lib/go/eye';
import ChartIcon from 'react-icons/lib/fa/bar-chart';

import { NavigationBar } from '/both/imports/components/NavigationBar';
import { Footer } from '/both/imports/components/Footer';
import {
  RootStyle,
  ContainerStyle,
  SmallSectionStyle,
  SpotlightCircle,
} from '/both/imports/styles';
import {
  Description,
  FifthSection,
  FirstSection,
  StartLink,
  FourthSection,
  ProfileContainerStyle,
  SecondSection,
  Handle,
  SectionTitle,
  SplashTextContainer,
  ThirdSection,
  Title,
  VisualizeIcons,
  PricingContainer,
  PricingSection,
  PricingSectionTitle,
  PriceContainer,
  Price,
  PriceLabel,
  MethodsSection,
  MethodContainer,
  MethodType,
  Methods,
  Method,
  Exploration,
  ExploreSection,
  LargeSystemImage,
  ExplorationTitle,
  ExplorationDescription,
} from './styles';

const AboutPure = () => (
  <RootStyle>
    <ContainerStyle>
      <FirstSection>
        <NavigationBar />
        <SplashTextContainer>
          <Title>atoms+bits</Title>
          <Description>molecular discovery with cloud-based quantum simulations and deep learning</Description>
          <StartLink href="https://atomsandbits.ai/">get started</StartLink>
        </SplashTextContainer>
      </FirstSection>
      <SecondSection id="explore">
        <SectionTitle>Explore</SectionTitle>
        <ExploreSection>
          <Exploration>
            <ExplorationTitle>Large Systems</ExplorationTitle>
            <LargeSystemImage src="/molecules/fullerene.png" />
            <ExplorationDescription>
              Study large systems cheaply and accurately with TensorMol.
            </ExplorationDescription>
          </Exploration>
          <Exploration>
            <ExplorationTitle>Projects</ExplorationTitle>
            <ExplorationDescription>Coming soon!</ExplorationDescription>
          </Exploration>
        </ExploreSection>
      </SecondSection>
      <ThirdSection id="methods">
        <SectionTitle>Methods</SectionTitle>
        <MethodsSection>
          <MethodContainer>
            <MethodType>Ground State</MethodType>
            <Methods>
              <Method>
                ML<sub>TM</sub>
              </Method>
              <Method>
                HF<sub>Psi4</sub>
              </Method>
              <Method>
                DFT<sub>Psi4</sub>
              </Method>
              <Method>
                CC<sub>Psi4</sub>
              </Method>
            </Methods>
          </MethodContainer>
          <MethodContainer>
            <MethodType>Geometry Optimization</MethodType>
            <Methods>
              <Method>
                ML<sub>TM</sub>
              </Method>
              <Method>
                HF<sub>Psi4</sub>
              </Method>
              <Method>
                DFT<sub>Psi4</sub>
              </Method>
              <Method>
                CC<sub>Psi4</sub>
              </Method>
            </Methods>
          </MethodContainer>
          <MethodContainer>
            <MethodType>Conformer Search</MethodType>
            <Methods>
              <Method>
                ML<sub>TM</sub>
              </Method>
            </Methods>
          </MethodContainer>
          <MethodContainer>
            <MethodType>Harmonic Spectra</MethodType>
            <Methods>
              <Method>
                ML<sub>TM</sub>
              </Method>
            </Methods>
          </MethodContainer>
          <MethodContainer>
            <MethodType>Relaxed Scan</MethodType>
            <Methods>
              <Method>
                ML<sub>TM</sub>
              </Method>
            </Methods>
          </MethodContainer>
        </MethodsSection>
      </ThirdSection>
      <FourthSection id="pricing">
        <SectionTitle>Pricing</SectionTitle>
        <PricingContainer>
          <PricingSection>
            <PricingSectionTitle>Burst</PricingSectionTitle>
            <PriceContainer>
              <PriceLabel>TensorMol</PriceLabel>
              <Price>TBD/atom/calc.</Price>
            </PriceContainer>
          </PricingSection>
          <PricingSection>
            <PricingSectionTitle>Compute</PricingSectionTitle>
            <PriceContainer>
              <PriceLabel>1 Core</PriceLabel>
              <Price>FREE</Price>
            </PriceContainer>
            <PriceContainer>
              <PriceLabel>10 Cores</PriceLabel>
              <Price>$20/mo.</Price>
            </PriceContainer>
            <PriceContainer>
              <PriceLabel>100 Cores</PriceLabel>
              <Price>$200/mo.</Price>
            </PriceContainer>
            <PriceContainer>
              <PriceLabel>1000 Cores</PriceLabel>
              <Price>$2000/mo.</Price>
            </PriceContainer>
            <PriceContainer>
              <PriceLabel>More / Private Server</PriceLabel>
              <Price>
                <a href="#contact">contact</a>
              </Price>
            </PriceContainer>
          </PricingSection>
        </PricingContainer>
      </FourthSection>
      {/* We need a section on technology here, and more flash graphics throughout. */}
      <FifthSection id="team">
        {/* <SectionTitle>Team</SectionTitle> */}
        <ProfileContainerStyle>
          <img src="/team/john.jpeg" />
          <div>
            <h1>John Parkhill</h1>
            <h2>Cofounder</h2>
            <Handle href="https://github.com/jparkhill">jparkhill</Handle>
          </div>
        </ProfileContainerStyle>
        <ProfileContainerStyle>
          <img src="/team/jordan.jpeg" />
          <div>
            <h1>Jordan Garside</h1>
            <h2>Cofounder</h2>
            <Handle href="https://github.com/jordangarside">
              jordangarside
            </Handle>
          </div>
        </ProfileContainerStyle>
      </FifthSection>
      <Footer />
    </ContainerStyle>
  </RootStyle>
);

const About = compose(
  lifecycle({
    componentDidUpdate() {
      let hash = this.props.location.hash;
      if (hash) {
        let node = document.querySelector(hash);
        if (node) {
          node.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
  })
)(AboutPure);

export default About;
