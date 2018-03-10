import React from 'react';

import { NavigationBar } from '/both/imports/components/NavigationBar'; 
import { Footer } from '/both/imports/components/Footer';
import { RootStyle, ContainerStyle, SmallSectionStyle, SpotlightCircle } from '/both/imports/styles';

const Contact = () => (
  <RootStyle>
    <ContainerStyle>
      <NavigationBar />
      <SmallSectionStyle>
        <div style={{margin: "0 auto", width: "66%"}}>
          <h2 style={{color: "white", fontSize: "2rem"}}>contact</h2>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div>
              <h2 style={{color: "white"}}>John</h2>
              <h1><a href="mailto:john.parkhill@gmail.com">john.parkhill@gmail.com</a></h1>
              <h2 style={{color: "white"}}>Jordan</h2>
              <h1><a href="mailto:jordangarside@gmail.com">jordangarside@gmail.com</a></h1>
            </div>
          </div>
        </div>
      </SmallSectionStyle>
      <Footer />
    </ContainerStyle>
  </RootStyle>
)

export default Contact;