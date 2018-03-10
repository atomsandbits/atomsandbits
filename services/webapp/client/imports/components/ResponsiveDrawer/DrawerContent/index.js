import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

import AddIcon from 'material-ui-icons/Add';
import AddOutlineIcon from 'material-ui-icons/AddCircleOutline';
import ListIcon from 'material-ui-icons/List';
import CancelIcon from 'material-ui-icons/Cancel';
import InfoOutlineIcon from 'material-ui-icons/InfoOutline';
// import ViewListIcon from 'material-ui-icons/ViewList';

import {
  aContainer,
  Button,
  DrawerContentContainer,
  FooterContainer,
  HeaderLogo,
  LinkContainer,
  LinkIcon,
  LinksContainer,
  LinkText,
} from './styles';

class DrawerContent extends React.Component {
  state = {};
  logout = () => {
    Meteor.logout();
  };
  render() {
    const { toggleDrawer } = this.props;
    return (
      <DrawerContentContainer>
        <Button component={HeaderLogo} onClick={toggleDrawer} to="/">
          cloudszi
        </Button>
        <LinksContainer>
          <Button
            component={LinkContainer}
            onClick={toggleDrawer}
            to="/new-calculation"
          >
            <LinkIcon>
              <AddIcon />
            </LinkIcon>
            <LinkText>New Calculation</LinkText>
          </Button>
          {/* <Button
            component={LinkContainer}
            onClick={toggleDrawer}
            to="/new-project"
          >
            <LinkIcon>
              <AddOutlineIcon />
            </LinkIcon>
            <LinkText>New Project</LinkText>
          </Button> */}
          <Button onClick={toggleDrawer} component={LinkContainer} to="/">
            <LinkIcon>
              <ListIcon />
            </LinkIcon>
            <LinkText>Results Feed</LinkText>
          </Button>
        </LinksContainer>
        <FooterContainer>
          <Button
            component={aContainer}
            href="https://about.cloudszi.com/"
            onClick={toggleDrawer}
          >
            <LinkIcon>
              <InfoOutlineIcon />
            </LinkIcon>
            <LinkText>About</LinkText>
          </Button>
          <Button component={LinkContainer} onClick={this.logout} to="/">
            <LinkIcon>
              <CancelIcon />
            </LinkIcon>
            <LinkText>Logout</LinkText>
          </Button>
        </FooterContainer>
      </DrawerContentContainer>
    );
  }
}

DrawerContent.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
};

export default DrawerContent;
