import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import Toolbar from 'material-ui/Toolbar';
import MenuIcon from 'material-ui-icons/Menu';

import { AppBar, AppBarContainer, MenuButtonContainer, Title } from './styles';

class Header extends React.PureComponent {
  state = {
    elevated: false,
  };
  componentDidMount() {
    document
      .querySelector('main')
      .addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    document
      .querySelector('main')
      .removeEventListener('scroll', this.handleScroll);
  }
  handleScroll = _.throttle(() => {
    if (document.querySelector('main').scrollTop >= 10) {
      this.setState({
        elevated: true,
      });
    } else {
      this.setState({
        elevated: false,
      });
    }
  }, 100).bind(this);
  render() {
    const { elevated } = this.state;
    const { content, location, title } = this.props;
    const path = location.pathname.split('/')[1];
    let routeName = '';
    switch (path) {
      case '':
      case 'my-calculations':
        routeName = 'My Calculations';
        break;
      case 'new-calculation':
        routeName = 'New Calculation';
        break;
      case 'geometry-database':
        routeName = 'Geometry Database';
        break;
      case 'calculation-database':
        routeName = 'Calculation Database';
        break;
      case 'about':
        routeName = 'About';
        break;
      default:
        routeName = 'cloudszi';
        break;
    }
    return (
      <AppBarContainer hide>
        <AppBar elevation={elevated ? 2 : 0} position="fixed">
          <Toolbar>
            <MenuButtonContainer
              color="inherit"
              aria-label="open drawer"
              onClick={window.toggleDrawer}
            >
              <MenuIcon />
            </MenuButtonContainer>
            <Title>{title}</Title>
            {content}
          </Toolbar>
        </AppBar>
      </AppBarContainer>
    );
  }
}

Header.propTypes = {
  // content: PropTypes.element.isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired })
    .isRequired,
};

export default withRouter(Header);
