import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import Hidden from 'material-ui/Hidden';
import DrawerContent from './DrawerContent';
import { Content, RootDiv, AppFrame, Drawer } from './styles';

class ResponsiveDrawer extends React.Component {
  state = {
    drawerOpen: false,
    userId: Meteor.userId(),
  };
  componentWillMount() {
    const { history } = this.props;
    window.toggleDrawer = this.handleDrawerToggle;
    this.userTracker = Tracker.autorun(() => {
      this.setState({ userId: Meteor.userId() });
      if (Meteor.userId()) {
        window.ga('set', 'userId', Meteor.userId());
      }
    });
    history.listen(() => {
      window.ga('set', 'page', window.location.pathname);
      window.ga('send', 'pageview');
    });
  }
  componentWillUnmount() {
    this.userTracker.stop();
  }
  userTracker = null;
  handleDrawerToggle = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen,
    });
  };
  render() {
    const { content } = this.props;
    const { pathname } = this.props.location;
    const { userId } = this.state;
    const needsRedirect = userId === null && pathname !== '/';
    return (
      <RootDiv>
        <AppFrame>
          {userId ? (
            <div>
              <Hidden lgUp>
                <Drawer
                  type="temporary"
                  anchor="left"
                  open={this.state.drawerOpen}
                  onClose={this.handleDrawerToggle}
                  ModalProps={{
                    keepMounted: true /* Better open performance on mobile. */,
                  }}
                >
                  <DrawerContent toggleDrawer={this.handleDrawerToggle} />
                </Drawer>
              </Hidden>
              <Hidden mdDown implementation="css">
                <Drawer type="permanent">
                  <DrawerContent toggleDrawer={() => {}} />
                </Drawer>
              </Hidden>
            </div>
          ) : null}
          {needsRedirect ? <Redirect to="/" /> : <Content>{content}</Content>}
        </AppFrame>
      </RootDiv>
    );
  }
}

ResponsiveDrawer.propTypes = {
  history: PropTypes.shape({ listen: PropTypes.func.isRequired }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired })
    .isRequired,
  content: PropTypes.element.isRequired,
};

export default withRouter(ResponsiveDrawer);
