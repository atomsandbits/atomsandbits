import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import FaMenu from 'react-icons/lib/md/menu';
import FaCloud from 'react-icons/lib/fa/cloud';
import FaPlus from 'react-icons/lib/fa/plus';

import { NavigationBarStyle } from '/both/imports/styles';
import { MenuButton, MenuStyle, MenuLink, IconLink, TextLink, GetStartedLink } from './styles';

class _NavigationBar extends Component {
  state = {
    fixed: false,
    navigationOpen: false
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
    window.addEventListener('click', this.handleDocumentClick.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('click', this.handleDocumentClick);
  }
  handleScroll(event) {
    if (window.pageYOffset >= 300) {
      this.setState({
        fixed: true
      })
    } else {
      this.setState({
        fixed: false
      })
    }
  }
  handleDocumentClick(event) {
      this.setState({
          navigationOpen: false
      })
  }
  handleMenuClick(event) {
    event.stopPropagation();
    this.setState({
      navigationOpen: !this.state.navigationOpen
    });
  }
  render() {
    const { pathname } = this.props.location;
    return (
      // place-holder div
      <div style={{height: "48px"}}>
                <NavigationBarStyle fixed={this.state.fixed} height="48px">
                    <MenuButton onClick={this.handleMenuClick.bind(this)}>
                        <FaMenu style={{marginRight: "0.75rem", fontSize: "1.5rem", color: "white"}}/>
                    </MenuButton>
                    <IconLink to="/">
                            <FaCloud style={{marginRight: "0.75rem", fontSize: "1.25rem", color: "white"}} />
                    </IconLink>
                    <TextLink to="/">
                            About
                    </TextLink>
                    <TextLink to="/team">
                            Team
                    </TextLink>
                    <TextLink to="/technology">
                            Technology
                    </TextLink>
                    <TextLink to="/contact">
                            Contact
                    </TextLink>
                    <GetStartedLink href="https://www.cloudszi.com">
                        Get Started
                    </GetStartedLink>
                    {
                        this.state.navigationOpen ? (
                            <MenuStyle>
                                <ul>
                                    <li>
                                        <MenuLink to="/">
                                            About
                                        </MenuLink>
                                    </li>
                                    <li>
                                        <MenuLink to="/team">
                                            Team
                                        </MenuLink>
                                    </li>
                                    <li>
                                        <MenuLink to="/technology">
                                            Technology
                                        </MenuLink>
                                    </li>
                                    <li>
                                        <MenuLink to="/contact">
                                            Contact
                                        </MenuLink>
                                    </li>
                                </ul>
                            </MenuStyle>)
                            : null
                    }
                    
                </NavigationBarStyle>
            </div>
    )
  }
}

const NavigationBar = withRouter(_NavigationBar);

export { NavigationBar };