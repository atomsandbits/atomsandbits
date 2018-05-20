import React from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  lifecycle,
  onlyUpdateForPropTypes,
  withHandlers,
  withState,
} from 'recompose';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import AddIcon from '@material-ui/icons/Add';
import AddOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import EnvelopeIcon from 'react-icons/lib/fa/envelope-o';
import GitlabIcon from 'react-icons/lib/fa/gitlab';
import GoogleIcon from 'react-icons/lib/fa/google';
import InfoOutlineIcon from '@material-ui/icons/InfoOutline';
import ListIcon from '@material-ui/icons/List';
import SearchIcon from '@material-ui/icons/Search';
// import ViewListIcon from '@material-ui/icons/ViewList';

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
  withState('userId', 'setUserId', Meteor.userId()),
  withHandlers({
    logout: () => () => Meteor.logout(),
    login: () => () => {
      Meteor.loginWithGoogle({}, (err) => {
        if (err) {
          // Login Error
        } else {
          // Successful Login
        }
      });
    },
  }),
  lifecycle({
    componentWillMount() {
      const { setUserId } = this.props;
      this.userTracker = Tracker.autorun(() => {
        setUserId(Meteor.userId());
        if (Meteor.userId()) {
          window.ga('set', 'userId', Meteor.userId());
        }
      });
    },
    componentWillUnmount() {
      this.userTracker.stop();
    },
  }),
  onlyUpdateForPropTypes
);

const DrawerContentPure = ({ userId, closeDrawer, login, logout }) => (
  <DrawerContentContainer>
    <Button component={HeaderLogo} onClick={closeDrawer} to="/">
      atoms+bits
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
      {userId ? (
        <Button onClick={closeDrawer} component={LinkContainer} to="/">
          <LinkIcon>
            <ListIcon />
          </LinkIcon>
          <LinkText>Results Feed</LinkText>
        </Button>
      ) : null}
      <Button
        onClick={closeDrawer}
        component={LinkContainer}
        to="/geometry-search?direction=desc&mass=0&mass=10000&search=&sort=mass"
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
        href="https://about.atomsandbits.ai/"
        onClick={closeDrawer}
      >
        <LinkIcon>
          <InfoOutlineIcon />
        </LinkIcon>
        <LinkText>About</LinkText>
      </Button>
      <Button
        component={aContainer}
        href="mailto:hello@atomsandbits.ai"
        onClick={closeDrawer}
      >
        <LinkIcon>
          <EnvelopeIcon />
        </LinkIcon>
        <LinkText>Contact</LinkText>
      </Button>
      <Button
        component={aContainer}
        href="https://gitlab.com/atomsandbits/atomsandbits"
        onClick={closeDrawer}
      >
        <LinkIcon>
          <GitlabIcon />
        </LinkIcon>
        <LinkText>Source</LinkText>
      </Button>
      {userId ? (
        <Button component={aContainer} onClick={logout}>
          <LinkIcon>
            <CancelIcon />
          </LinkIcon>
          <LinkText>Logout</LinkText>
        </Button>
      ) : (
        <Button component={aContainer} onClick={login}>
          <LinkIcon>
            <GoogleIcon />
          </LinkIcon>
          <LinkText>Sign in with Google</LinkText>
        </Button>
      )}
    </FooterContainer>
  </DrawerContentContainer>
);
DrawerContentPure.propTypes = {
  closeDrawer: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  userId: PropTypes.string,
};
DrawerContentPure.defaultProps = {
  closeDrawer: () => {},
};

const DrawerContent = enhance(DrawerContentPure);

export { DrawerContent };
export default DrawerContent;
