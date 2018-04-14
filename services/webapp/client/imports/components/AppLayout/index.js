import React from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  lifecycle,
  onlyUpdateForPropTypes,
  withState,
  withHandlers,
} from 'recompose';
import throttle from 'lodash/throttle';
import Toolbar from 'material-ui/Toolbar';
import MenuIcon from 'material-ui-icons/Menu';

import {
  App,
  AppLayoutContainer,
  AppBar,
  MenuButtonContainer,
  Title,
} from './styles';

const onScroll = throttle(({ elevated, setElevated }) => {
  if (window.pageYOffset >= 10) {
    if (!elevated) setElevated(true);
  } else {
    if (elevated) setElevated(false);
  }
}, 100);

const enhance = compose(
  withState('elevated', 'setElevated', false),
  withHandlers({
    scroll: ({ elevated, setElevated }) => () =>
      onScroll({ elevated, setElevated }),
  }),
  lifecycle({
    componentDidMount() {
      const { scroll } = this.props;
      document.addEventListener('scroll', scroll);
    },
    // shouldComponentUpdate(nextProps) {
    //   const { scroll } = this.props;
    //   document.removeEventListener('scroll', scroll);
    //   document.addEventListener('scroll', nextProps.scroll);
    //   return true;
    // },
    componentWillUnmount() {
      const { scroll } = this.props;
      document.removeEventListener('scroll', scroll);
    },
  }),
  onlyUpdateForPropTypes
);

const AppLayoutPure = ({
  toolbarContent,
  appContent,
  title,
  elevated,
  alwaysRaised,
  mobileOnlyToolbar,
}) => (
  <AppLayoutContainer>
    <AppBar
      mobileonlytoolbar="true"
      elevation={alwaysRaised || elevated ? 2 : 0}
      position="fixed"
    >
      <Toolbar>
        <MenuButtonContainer
          color="inherit"
          aria-label="open drawer"
          onClick={window.toggleDrawer}
        >
          <MenuIcon />
        </MenuButtonContainer>
        <Title>{title}</Title>
        {toolbarContent}
      </Toolbar>
    </AppBar>
    <App mobileOnlyToolbar className="app">
      {appContent}
    </App>
  </AppLayoutContainer>
);
AppLayoutPure.propTypes = {
  toolbarContent: PropTypes.element,
  appContent: PropTypes.element,
  title: PropTypes.string,
  elevated: PropTypes.bool.isRequired,
  alwaysRaised: PropTypes.bool,
  mobileOnlyToolbar: PropTypes.bool,
};

const AppLayout = enhance(AppLayoutPure);

export { AppLayout };
export default AppLayout;
