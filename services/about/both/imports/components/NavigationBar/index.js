import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import FaMenu from 'react-icons/lib/md/menu';
import FaCloud from 'react-icons/lib/fa/cloud';
import FaPlus from 'react-icons/lib/fa/plus';

import {
  MenuButton,
  MenuStyle,
  MenuLink,
  IconLink,
  TextLink,
  GetStartedLink,
  Logo,
  NavigationBarStyle,
} from './styles';

class _NavigationBar extends Component {
  state = {
    navigationOpen: false,
  };
  componentDidMount() {
    window.addEventListener('click', this.handleDocumentClick.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.handleDocumentClick);
  }
  handleDocumentClick(event) {
    this.setState({
      navigationOpen: false,
    });
  }
  handleMenuClick(event) {
    event.stopPropagation();
    this.setState({
      navigationOpen: !this.state.navigationOpen,
    });
  }
  render() {
    const { pathname } = this.props.location;
    return (
      <NavigationBarStyle height="64px">
        <a href="https://atomsandbits.ai/"><Logo src="/favicon-128.png" /></a>
        <div style={{flexGrow: 1}} />
        <MenuButton onClick={this.handleMenuClick.bind(this)}>
          <FaMenu
            style={{
              fontSize: '1.5rem',
              color: 'inherit',
            }}
          />
        </MenuButton>
        <TextLink to="#explore">Explore</TextLink>
        <TextLink to="#methods">Methods</TextLink>
        <TextLink to="#pricing">Pricing</TextLink>
        <TextLink to="#team">Team</TextLink>
        <TextLink to="#contact">Contact</TextLink>
        {this.state.navigationOpen ? (
          <MenuStyle>
            <ul>
              <li>
                <MenuLink to="#explore">Explore</MenuLink>
              </li>
              <li>
                <MenuLink to="#methods">Methods</MenuLink>
              </li>
              <li>
                <MenuLink to="#pricing">Pricing</MenuLink>
              </li>
              <li>
                <MenuLink to="#team">Team</MenuLink>
              </li>
              <li>
                <MenuLink to="#contact">Contact</MenuLink>
              </li>
            </ul>
          </MenuStyle>
        ) : null}
      </NavigationBarStyle>
    );
  }
}

const NavigationBar = withRouter(_NavigationBar);

export { NavigationBar };
