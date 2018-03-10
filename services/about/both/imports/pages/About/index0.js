import React from 'react';
import CalculatorIcon from 'react-icons/lib/go/file-binary';
import CubeIcon from 'react-icons/lib/fa/cubes';
import SaveIcon from 'react-icons/lib/md/save';
import ListIcon from 'react-icons/lib/go/list-ordered';
import EyeIcon from 'react-icons/lib/go/eye';
import ChartIcon from 'react-icons/lib/fa/bar-chart';

import { NavigationBar } from '/both/imports/components/NavigationBar'; 
import { Footer } from '/both/imports/components/Footer';
import { RootStyle, ContainerStyle, SmallSectionStyle, SpotlightCircle } from '/both/imports/styles';
import { VisualizeIcons } from './styles';

const About = () => (
  <RootStyle>
    <ContainerStyle>
      <NavigationBar />
      <SmallSectionStyle>
        <div style={{margin: "0 auto", width: "66%"}}>
          <h2 style={{color: "white", fontSize: "2rem", fontWeight: 300}}>cloudszi</h2>
          <h1 style={{fontSize: "2.5rem"}}>A platform for intelligent molecular discovery at scale</h1>
        </div>
      </SmallSectionStyle>
      <SmallSectionStyle backgroundColor="#3C9AD8" textColor="white">
        <SpotlightCircle>
          <CalculatorIcon />
        </SpotlightCircle>
        <div style={{margin: "0 auto", width: "66%"}}>
          <h2>calculate</h2>
          <h1>Search chemical space using the latest quantum and machine learning techniques</h1>
        </div>
      </SmallSectionStyle>
      <SmallSectionStyle backgroundColor="white" textColor="black">
        <div style={{margin: "0 auto", width: "66%"}}>
          <h2>scale</h2>
          <h1>Look mom: no queue -- cloudszi scales on demand and you pay only for what you use</h1>
        </div>
        <SpotlightCircle right dark>
          <CubeIcon />
        </SpotlightCircle>
      </SmallSectionStyle>
      <SmallSectionStyle backgroundColor="#3C9AD8" textColor="white">
        <SpotlightCircle>
          <SaveIcon />
        </SpotlightCircle>
        <div style={{margin: "0 auto", width: "66%"}}>
          <h2>save</h2>
          <h1>Make your data useful as a part of the cloudszi database, or keep it private</h1>
        </div>
      </SmallSectionStyle>
      <SmallSectionStyle textColor="white" noBottomPadding>
        <div style={{margin: "0 auto", width: "66%", textAlign: 'center'}}>
          <h2>visualize</h2>
          <VisualizeIcons>
            <ListIcon />
            <EyeIcon />
            <ChartIcon />
          </VisualizeIcons>
        </div>
      </SmallSectionStyle>
      <SmallSectionStyle textColor="white">
        <div style={{margin: "0 auto", width: "66%", textAlign: 'center'}}>
          <h2>Simple calculations are free on cloudszi.</h2>
          <h2>Try it today!</h2>
        </div>
      </SmallSectionStyle>
      <Footer />
    </ContainerStyle>
  </RootStyle>
)

export default About;
