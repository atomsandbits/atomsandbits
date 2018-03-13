import React from 'react';

import List, {ListItem, ListItemText} from 'material-ui/List';
import Menu, {MenuItem} from 'material-ui/Menu';

const ITEM_HEIGHT = 48;
const DropdownMenu = ({
  classes,
  theme,
  handleRequestClose,
  handleClickListItem,
  handleMenuItemClick,
  anchorEl,
  open,
  menuItems,
  selectedIndex,
  setValue,
  type,
  label
}) => {
  setValue(type, menuItems[selectedIndex].value);
  return (<div>
    <List>
      <ListItem button={true} className={classes.selectable} aria-haspopup="true" aria-controls="lock-menu" aria-label={label} onClick={event => handleClickListItem(event, type)}>
        <ListItemText primary={label} secondary={menuItems[selectedIndex].prettyName}/>
      </ListItem>
    </List>
    <Menu id="lock-menu" anchorEl={anchorEl} open={open} onRequestClose={event => handleRequestClose(event, type)} PaperProps={{
        style: {
          maxHeight: ITEM_HEIGHT * 4.5
        }
      }}>
      {
        menuItems.map((menuItem, index) => (<MenuItem key={menuItem.value} selected={index === selectedIndex} onClick={event => handleMenuItemClick(event, index, type, menuItem.value)}>
          {menuItem.prettyName}
        </MenuItem>))
      }
    </Menu>
  </div>)
}

export default DropdownMenu;
