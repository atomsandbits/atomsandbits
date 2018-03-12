import React from 'react';
import { compose, pure, lifecycle, withState, withHandlers } from 'recompose';
import Toolbar from 'material-ui/Toolbar';
import MenuIcon from 'material-ui-icons/Menu';

import {
  App,
  AppLayoutContainer,
  AppBar,
  MenuButtonContainer,
  Title,
} from './styles';

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

const onScroll = ({ setElevated }) => () => {
  if (document.querySelector('.app').scrollTop >= 10) {
    setElevated(true);
  } else {
    setElevated(false);
  }
};

const lifeCycleHooks = lifecycle({
  componentDidMount() {
    const { scroll } = this.props;
    document.querySelector('.app').addEventListener('scroll', scroll);
  },
  componentWillUnmount() {
    const { scroll } = this.props;
    document.querySelector('.app').removeEventListener('scroll', scroll);
  },
});

const AppLayout = compose(
  withState('elevated', 'setElevated', false),
  withHandlers({
    scroll: onScroll,
  }),
  lifeCycleHooks,
  pure
)(AppLayoutPure);

export { AppLayout };
export default AppLayout;
