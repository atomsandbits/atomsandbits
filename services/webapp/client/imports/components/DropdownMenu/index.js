import React from 'react';
import PropTypes from 'prop-types';

import List, { ListItem, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import styles from '/client/imports/pages/NewCalculation/styles';

const ITEM_HEIGHT = 48;

class DropdownMenu extends React.Component {
  state = {
    selectedIndex: this.props.menuItems
      .map((menuItem) => {
        return menuItem.value;
      })
      .indexOf(this.props.value),
    open: false,
    anchorEl: null,
  };
  componentWillMount() {
    if (this.props.value === undefined) {
      const { value } = this.props.menuItems[0];
      this.setState({ selectedIndex: 0 });
      this.props.setValue(value);
    }
  }
  componentWillUpdate(nextProps, nextState) {
    if (!nextState) nextState = this.state;
    if (
      typeof nextProps.menuItems[nextState.selectedIndex] === 'undefined' ||
      nextProps.value !== nextProps.menuItems[nextState.selectedIndex].value
    ) {
      const { value } = nextProps.menuItems[0];
      this.setState({ selectedIndex: 0 });
      nextProps.setValue(value);
    }
  }
  componentWillUnmount() {
    this.props.unsetValue();
  }
  handleClickListItem = (event) => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };
  handleMenuItemClick = (event, index, value) => {
    this.setState({
      selectedIndex: index,
      open: false,
    });
    this.props.setValue(value);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes, theme, menuItems, label, labelElement } = this.props;
    if (typeof this.props.menuItems[this.state.selectedIndex] === 'undefined') {
      return <div />;
    }
    return (
      <div className={this.props.className}>
        {labelElement ? (
          React.cloneElement(labelElement, {
            onClick: (event) => {
              this.handleClickListItem(event);
            },
          })
        ) : (
          <List>
            <ListItem
              button
              className={classes.selectable}
              aria-haspopup="true"
              aria-controls="lock-menu"
              aria-label={label}
              onClick={(event) => {
                this.handleClickListItem(event);
              }}
            >
              <ListItemText
                disableTypography
                primary={
                  <div>
                    <Typography type="body1" color="textSecondary">
                      {label}
                    </Typography>
                    <Typography type="subheading">
                      {menuItems[this.state.selectedIndex].prettyName}
                    </Typography>
                  </div>
                }
              />
            </ListItem>
          </List>
        )}
        <Menu
          id="lock-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onClose={(event) => {
            this.handleClose(event);
          }}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
            },
          }}
        >
          {menuItems.map((menuItem, index) => (
            <MenuItem
              key={menuItem.value}
              selected={index === this.state.selectedIndex}
              onClick={(event) => {
                this.handleMenuItemClick(event, index, menuItem.value);
              }}
            >
              {menuItem.prettyName}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

DropdownMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  menuItems: PropTypes.array.isRequired,
};

export default withStyles(styles, { withTheme: true })(DropdownMenu);
