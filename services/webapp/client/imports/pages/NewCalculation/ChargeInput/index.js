import React from 'react';
import PropTypes from 'prop-types';
import {Session} from 'meteor/session';

import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import styles from "./styles";
import DropdownMenu from '/client/imports/components/DropdownMenu';

class CalculationTypeOptions extends React.Component {
  render() {
    return (<Grid item={true} xs={6} sm={4}>
      <DropdownMenu classes={this.props.classes} value="groundState" unsetValue={this.props.unsetValue} theme={this.props.theme} menuItems={this.props.menuItems} setValue={this.props.setValue} label="Calculation"/>
    </Grid>)
  }
}

CalculationTypeOptions.propTypes = {
  // classes: PropTypes.object.isRequired,
  // theme: PropTypes.object.isRequired,
  // setCalculationType: PropTypes.func.isRequired,
};

export default withStyles(styles, {withTheme: true})(CalculationTypeOptions);
