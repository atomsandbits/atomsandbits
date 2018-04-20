import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  mapProps,
  withState,
  withHandlers,
  lifecycle,
  onlyUpdateForPropTypes,
} from 'recompose';
import { withRouter, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import Hidden from 'material-ui/Hidden';
import DrawerContent from './DrawerContent';
import { Content, AppFrame, Drawer } from './styles';

const enhance = compose(
  withRouter,
  mapProps(({ location, history, content, ...otherProps }) => ({
    content: content,
    onLocationChange: history.listen,
    locationPathname: location.pathname,
    location,
  })),
  withState('drawerOpen', 'setDrawerOpen', false),
  withState('userId', 'setUserId', Meteor.userId()),
  withHandlers({
    openDrawer: ({ drawerOpen, setDrawerOpen }) => () =>
      !drawerOpen ? setDrawerOpen(true) : null,
    closeDrawer: ({ drawerOpen, setDrawerOpen }) => () =>
      drawerOpen ? setDrawerOpen(false) : null,
    toggleDrawer: ({ drawerOpen, setDrawerOpen }) => () =>
      setDrawerOpen(!drawerOpen),
  }),
  lifecycle({
    componentWillMount() {
      const {
        onLocationChange,
        toggleDrawer,
        locationPathname,
        setUserId,
      } = this.props;
      window.toggleDrawer = toggleDrawer;
      this.userTracker = Tracker.autorun(() => {
        setUserId(Meteor.userId());
        if (Meteor.userId()) {
          window.ga('set', 'userId', Meteor.userId());
        }
      });
      onLocationChange(() => {
        window.ga('set', 'page', locationPathname);
        window.ga('send', 'pageview');
      });
    },
    componentWillUnmount() {
      this.userTracker.stop();
    },
  }),
  onlyUpdateForPropTypes
);

const ResponsiveDrawerPure = ({
  content,
  locationPathname,
  drawerOpen,
  closeDrawer,
  openDrawer,
  userId,
}) => {
  const needsRedirect = userId === null && locationPathname !== '/';
  return (
    <AppFrame>
      {userId ? (
        <Fragment>
          <Hidden lgUp>
            <Drawer
              variant="temporary"
              anchor="left"
              open={drawerOpen}
              onClose={closeDrawer}
              ModalProps={{
                keepMounted: true /* Better open performance on mobile. */,
              }}
            >
              <DrawerContent
                openDrawer={openDrawer}
                closeDrawer={closeDrawer}
              />
            </Drawer>
          </Hidden>
          <Hidden mdDown implementation="css">
            <Drawer variant="permanent">
              <DrawerContent
                openDrawer={openDrawer}
                closeDrawer={closeDrawer}
              />
            </Drawer>
          </Hidden>
        </Fragment>
      ) : null}
      {needsRedirect ? <Redirect to="/" /> : <Content>{content}</Content>}
    </AppFrame>
  );
};
ResponsiveDrawerPure.propTypes = {
  onLocationChange: PropTypes.func.isRequired,
  locationPathname: PropTypes.string.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  openDrawer: PropTypes.func.isRequired,
  closeDrawer: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  userId: PropTypes.string,
  content: PropTypes.element.isRequired,
  location:
    PropTypes.object.isRequired /* react-router requires to update children */,
};

const ResponsiveDrawer = enhance(ResponsiveDrawerPure);

export { ResponsiveDrawerPure };
export default ResponsiveDrawer;
