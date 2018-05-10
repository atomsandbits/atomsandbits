import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import FaCloud from 'react-icons/lib/fa/cloud';
import FaPlus from 'react-icons/lib/fa/plus';

import {
  FooterStyle,
  DividerStyle,
  FooterLink,
  FooterLinkA,
  ContactInformationContainer,
} from './styles';

class _Footer extends Component {
  state = {};
  render() {
    const { pathname } = this.props.location;
    return (
      <FooterStyle height="48px">
        <FooterLinkA href="https://www.atomsandbits.ai">Get Started</FooterLinkA>
        <DividerStyle>|</DividerStyle>
        <FooterLink to="#explore">Explore</FooterLink>
        <DividerStyle>|</DividerStyle>
        <FooterLink to="#methods">Methods</FooterLink>
        <DividerStyle>|</DividerStyle>
        <FooterLink to="#pricing">Pricing</FooterLink>
        <ContactInformationContainer id="contact">
          <FooterLinkA href="email:contact@atomsandbits.ai">Email</FooterLinkA>
          <DividerStyle>|</DividerStyle>
          <FooterLinkA href="https://gitlab.com/atomsandbits/atomsandbits">GitLab</FooterLinkA>
        </ContactInformationContainer>
      </FooterStyle>
    );
  }
}

const Footer = withRouter(_Footer);

export { Footer };
