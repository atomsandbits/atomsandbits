import React from 'react';
import PropTypes from 'prop-types';
import { compose, onlyUpdateForPropTypes } from 'recompose';
import Menu, { MenuItem } from 'material-ui/Menu';

import {
  DropdownContainer,
  LabelButton,
  LabelText,
  LabelValue,
} from './styles';

const ITEM_HEIGHT = 48;

const enhance = compose(onlyUpdateForPropTypes);

class DropdownMenu extends React.Component {
  state = {
    selectedIndex: this.props.menuItems
      .map(menuItem => {
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
  componentDidUpdate(prevProps, prevState) {
    // Update State and Value if index no longer exists in menuItems or
    // the menuItems have changed
    if (
      typeof this.props.menuItems[this.state.selectedIndex] === 'undefined' ||
      prevProps.menuItems !== this.props.menuItems
    ) {
      const { value } = this.props.menuItems[0];
      this.setState({ selectedIndex: 0 });
      this.props.setValue(value);
    }
  }
  componentWillUnmount() {
    this.props.unsetValue();
  }
  handleLabelClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };
  handleMenuItemClick = (index, value) => event => {
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
    const { className, menuItems, label, labelElement } = this.props;
    const { anchorEl, open, selectedIndex } = this.state;
    if (typeof this.props.menuItems[selectedIndex] === 'undefined') {
      return <div />;
    }
    return (
      <DropdownContainer className={className}>
        {labelElement ? (
          React.cloneElement(labelElement, {
            onClick: this.handleLabelClick,
          })
        ) : (
          <LabelButton
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label={label}
            onMouseDown={this.handleLabelClick}
            onClick={this.handleLabelClick}
          >
            <LabelText>{label}</LabelText>
            <LabelValue>{menuItems[selectedIndex].prettyName}</LabelValue>
          </LabelButton>
        )}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
            },
          }}
        >
          {menuItems.map((menuItem, index) => (
            <MenuItem
              key={menuItem.value}
              selected={index === selectedIndex}
              onClick={this.handleMenuItemClick(index, menuItem.value)}
            >
              {menuItem.prettyName}
            </MenuItem>
          ))}
        </Menu>
      </DropdownContainer>
    );
  }
}
DropdownMenu.propTypes = {
  setValue: PropTypes.func.isRequired,
  unsetValue: PropTypes.func.isRequired,
  menuItems: PropTypes.array.isRequired,
  label: PropTypes.string,
  labelElement: PropTypes.element,
  value: PropTypes.any,
  className: PropTypes.string,
};
DropdownMenu.defaultProps = {
  setValue: () => {},
  unsetValue: () => {},
};

export default enhance(DropdownMenu);
