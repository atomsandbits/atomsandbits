import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import FaCloud from 'react-icons/lib/fa/cloud';
import FaPlus from 'react-icons/lib/fa/plus';

import { FooterStyle, DividerStyle } from '/both/imports/styles';
import { FooterLink, FooterLinkA } from './styles';

class _Footer extends Component {
    state = {}
    render(){
        const {pathname} = this.props.location;
        return(
            <FooterStyle height="48px">
                <FooterLink to="/">
                    <b style={{}}>About</b>
                </FooterLink>
                <DividerStyle>|</DividerStyle>
                <FooterLinkA href="https://www.cloudszi.com">
                    <b style={{}}>Get Started</b>
                </FooterLinkA>
                <DividerStyle>|</DividerStyle>
                <FooterLink to="/team">
                    <b style={{}}>Team</b>
                </FooterLink>
                <DividerStyle>|</DividerStyle>
                <FooterLink to="/technology">
                    <b style={{}}>Technology</b>
                </FooterLink>
                <DividerStyle>|</DividerStyle>
                <FooterLink to="/privacy-policy">
                    <b style={{}}>Privacy Policy</b>
                </FooterLink>
                <DividerStyle>|</DividerStyle>
                <FooterLink to="/contact">
                    <b style={{}}>Contact</b>
                </FooterLink>
            </FooterStyle>
        )
    }
}

const Footer = withRouter(_Footer);

export {Footer};