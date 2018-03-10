import React from 'react';
import PropTypes from 'prop-types';
import {Session} from 'meteor/session';

import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';

import styles from "./styles";

class KPointsInput extends React.Component {
  inputValue = (event, position) => {
    let value = this.props.value;
    value[position] = parseInt(event.target.value)
    this.props.setValue(value);
  }
  componentWillMount() {
    if (this.props.value === undefined) {
      let value = [2, 2, 2]
      this.props.setValue(value);
    }
  }
  componentWillUnmount() {
    this.props.unsetValue();
  }
  render() {
    const kpts = this.props.value;
    if (!kpts) {
      return <div/>
    }
    return (<Grid item={true} xs={12} sm={4} style={{
        padding: '23px 16px 0'
      }}>
      <Typography color="textSecondary" type="body1">K-Points</Typography>
      <Grid container={true}>
        <Grid item={true} xs={4}>
          <TextField onChange={event => this.inputValue(event, 0)} label="x" type="number" value={kpts[0]} inputProps={{
              min: 0,
              max: 10
            }}/>
        </Grid>
        <Grid item={true} xs={4}>
          <TextField onChange={event => this.inputValue(event, 1)} label="y" type="number" value={kpts[1]} inputProps={{
              min: 0,
              max: 10
            }}/>
        </Grid>
        <Grid item={true} xs={4}>
          <TextField onChange={event => this.inputValue(event, 2)} label="z" type="number" value={kpts[2]} inputProps={{
              min: 0,
              max: 10
            }}/>
        </Grid>
      </Grid>
    </Grid>)
  }
}

KPointsInput.propTypes = {
  // classes: PropTypes.object.isRequired,
  // theme: PropTypes.object.isRequired,
  // setCalculationType: PropTypes.func.isRequired,
};

export default withStyles(styles, {withTheme: true})(KPointsInput);
