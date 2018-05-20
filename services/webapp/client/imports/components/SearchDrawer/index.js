import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  withState,
  withHandlers,
  lifecycle,
  onlyUpdateForPropTypes,
} from 'recompose';
import Hidden from '@material-ui/core/Hidden';

import DrawerContent from './DrawerContent';
import { Drawer } from './styles';

const enhance = compose(
  withState('drawerOpen', 'setDrawerOpen', false),
  withHandlers({
    openDrawer: ({ drawerOpen, setDrawerOpen }) => () =>
      !drawerOpen ? setDrawerOpen(true) : null,
    closeDrawer: ({ drawerOpen, setDrawerOpen }) => () =>
      drawerOpen ? setDrawerOpen(false) : null,
    toggleDrawer: ({ drawerOpen, setDrawerOpen }) => () =>
      setDrawerOpen(!drawerOpen),
  }),
  lifecycle({
    componentDidMount() {
      const { toggleDrawer } = this.props;
      window.toggleSearchDrawer = toggleDrawer;
    },
    componentDidUpdate() {
      const { toggleDrawer } = this.props;
      window.toggleSearchDrawer = toggleDrawer;
    },
    componentWillUnmount() {
      window.toggleSearchDrawer = () => {};
    },
  }),
  onlyUpdateForPropTypes
);

const SearchDrawerPure = ({ drawerOpen, openDrawer, closeDrawer }) => (
  <Fragment>
    <Hidden mdUp>
      <Drawer
        variant="temporary"
        anchor="right"
        open={drawerOpen}
        onOpen={openDrawer}
        onClose={closeDrawer}
        ModalProps={{
          keepMounted: true /* Better open performance on mobile. */,
        }}
      >
        <DrawerContent closeDrawer={closeDrawer} />
      </Drawer>
    </Hidden>
    <Hidden smDown implementation="css">
      <Drawer
        open={true}
        onOpen={openDrawer}
        onClose={closeDrawer}
        variant="permanent"
        anchor="right"
      >
        <DrawerContent closeDrawer={closeDrawer} />
      </Drawer>
    </Hidden>
  </Fragment>
);
SearchDrawerPure.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  openDrawer: PropTypes.func.isRequired,
  closeDrawer: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

const SearchDrawer = enhance(SearchDrawerPure);

export { SearchDrawer };
export default SearchDrawer;
