import React from 'react';
import PropTypes from 'prop-types';
import { compose, onlyUpdateForPropTypes, withHandlers } from 'recompose';
import { Meteor } from 'meteor/meteor';

import AddIcon from 'material-ui-icons/Add';
import AddOutlineIcon from 'material-ui-icons/AddCircleOutline';
import ListIcon from 'material-ui-icons/List';
import CancelIcon from 'material-ui-icons/Cancel';
import SearchIcon from 'material-ui-icons/Search';
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

const enhance = compose(
  withHandlers({
    logout: () => () => Meteor.logout(),
  }),
  onlyUpdateForPropTypes
);

const DrawerContentPure = ({ closeDrawer, logout }) => (
  <DrawerContentContainer>
    <Button component={HeaderLogo} onClick={closeDrawer} to="/">
      cloudszi
    </Button>
    <LinksContainer>
      <Button
        component={LinkContainer}
        onClick={closeDrawer}
        to="/new-calculation"
      >
        <LinkIcon>
          <AddIcon />
        </LinkIcon>
        <LinkText>New Calculation</LinkText>
      </Button>
      <Button component={LinkContainer} onClick={closeDrawer} to="/new-project">
        <LinkIcon>
          <AddOutlineIcon />
        </LinkIcon>
        <LinkText>New Project</LinkText>
      </Button>
      <Button onClick={closeDrawer} component={LinkContainer} to="/">
        <LinkIcon>
          <ListIcon />
        </LinkIcon>
        <LinkText>Results Feed</LinkText>
      </Button>
      <Button
        onClick={closeDrawer}
        component={LinkContainer}
        to="/geometry-search?direction=desc&mass=0&mass=5000&search=&sort=mass"
      >
        <LinkIcon>
          <SearchIcon />
        </LinkIcon>
        <LinkText>Geometry Search</LinkText>
      </Button>
    </LinksContainer>
    <FooterContainer>
      <Button
        component={aContainer}
        href="https://about.cloudszi.com/"
        onClick={closeDrawer}
      >
        <LinkIcon>
          <InfoOutlineIcon />
        </LinkIcon>
        <LinkText>About</LinkText>
      </Button>
      <Button component={LinkContainer} onClick={logout} to="/">
        <LinkIcon>
          <CancelIcon />
        </LinkIcon>
        <LinkText>Logout</LinkText>
      </Button>
    </FooterContainer>
  </DrawerContentContainer>
);
DrawerContentPure.propTypes = {
  closeDrawer: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};
DrawerContentPure.defaultProps = {
  closeDrawer: () => {},
};

const DrawerContent = enhance(DrawerContentPure);

export { DrawerContent };
export default DrawerContent;
