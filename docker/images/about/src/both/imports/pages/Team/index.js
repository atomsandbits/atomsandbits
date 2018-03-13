import React from 'react';

import { NavigationBar } from '/both/imports/components/NavigationBar'; 
import { Footer } from '/both/imports/components/Footer';
import { RootStyle, ContainerStyle, SmallSectionStyle, SpotlightCircle } from '/both/imports/styles';
import { ProfileContainerStyle } from './styles';

const Team = () => (
  <RootStyle>
    <ContainerStyle>
      <NavigationBar />
      <SmallSectionStyle>
        <div style={{margin: "0 auto", width: "66%"}}>
          <h2 style={{color: "white", fontSize: "2rem"}}>the cloudszi team</h2>
        </div>
      </SmallSectionStyle>
      <SmallSectionStyle column noPadding backgroundColor="white" textColor="black">
        <ProfileContainerStyle>
            <img src="/team/john.jpeg" />
            <div>
                <h1>John Parkhill</h1>
                <h2>PhD, UC Berkeley</h2>
                <h2>Cofounder</h2>
            </div>
        </ProfileContainerStyle>
        <ProfileContainerStyle>
            <img src="/team/jordan.jpeg" />
            <div>
                <h1>Jordan Garside</h1>
                <h2>Human</h2>
                <h2>Cofounder</h2>
            </div>
        </ProfileContainerStyle>
      </SmallSectionStyle>
      <Footer />
    </ContainerStyle>
  </RootStyle>
)

export default Team;