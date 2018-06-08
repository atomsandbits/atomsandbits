import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import {
  FooterStyle,
  DividerStyle,
  LegalContainer,
  FooterLink,
  FooterLinkA,
  ContactInformationContainer,
} from './styles';

class _Footer extends Component {
  state = {};
  render() {
    // const { pathname } = this.props.location;
    return (
      <FooterStyle>
        <FooterLinkA href="https://www.atomsandbits.ai">
          Get Started
        </FooterLinkA>
        <DividerStyle>|</DividerStyle>
        <FooterLink to="#explore">Explore</FooterLink>
        <DividerStyle>|</DividerStyle>
        <FooterLink to="#methods">Methods</FooterLink>
        <DividerStyle>|</DividerStyle>
        <FooterLink to="#pricing">Pricing</FooterLink>
        <ContactInformationContainer id="contact">
          <FooterLinkA href="email:contact@atomsandbits.ai">Email</FooterLinkA>
          <DividerStyle>|</DividerStyle>
          <FooterLinkA href="https://gitlab.com/atomsandbits/atomsandbits">
            GitLab
          </FooterLinkA>
        </ContactInformationContainer>
        <LegalContainer>
          All rights reserved.{' '}
          <FooterLinkA
            href="https://opencorporates.com/companies/us_de/6757578"
            target="_blank"
            style={{}}
          >
            Cloudszi, Inc.
          </FooterLinkA>
        </LegalContainer>
      </FooterStyle>
    );
  }
}
_Footer.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }),
};

const Footer = withRouter(_Footer);

export { Footer };
