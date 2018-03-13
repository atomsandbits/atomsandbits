import React from 'react';
import PropTypes from 'prop-types';
import {Session} from 'meteor/session';

import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';

import styles from "./styles";

class LatticeVectorsInput extends React.Component {
  inputValue = (event, position) => {
    let value = this.props.value;
    value[position[0]][position[1]] = parseFloat(event.target.value)
    this.props.setValue(value);
  }
  componentWillMount() {
    if (this.props.value === undefined) {
      let value = [[3, 0, 0], [0, 3, 0], [0, 0, 3]]
      this.props.setValue(value);
    }
  }
  componentWillUnmount() {
    this.props.unsetValue();
  }
  render() {
    const a = this.props.value;
    if (!a) {
      return <div/>
    }
    return (<Grid item={true} xs={12} sm={4} style={{
        padding: '23px 16px 0'
      }}>
      <Typography color="textSecondary" type="body1">Lattice Vectors (Å)</Typography>
      <Grid container={true}>
        <Grid item={true} xs={4}>
          <TextField onChange={event => this.inputValue(event, [0,0])} label={<div>a<sub>11</sub></div>} type="number" value={a[0][0]}/>
        </Grid>
        <Grid item={true} xs={4}>
          <TextField onChange={event => this.inputValue(event, [0,1])} label={<div>a<sub>21</sub></div>} type="number" value={a[0][1]}/>
        </Grid>
        <Grid item={true} xs={4}>
          <TextField onChange={event => this.inputValue(event, [0,2])} label={<div>a<sub>31</sub></div>} type="number" value={a[0][2]}/>
        </Grid>
      </Grid>
      <Grid container={true}>
        <Grid item={true} xs={4}>
          <TextField onChange={event => this.inputValue(event, [1,0])} label={<div>a<sub>12</sub></div>} type="number" value={a[1][0]}/>
        </Grid>
        <Grid item={true} xs={4}>
          <TextField onChange={event => this.inputValue(event, [1,1])} label={<div>a<sub>22</sub></div>} type="number" value={a[1][1]}/>
        </Grid>
        <Grid item={true} xs={4}>
          <TextField onChange={event => this.inputValue(event, [1,2])} label={<div>a<sub>32</sub></div>} type="number" value={a[1][2]}/>
        </Grid>
      </Grid>
      <Grid container={true}>
        <Grid item={true} xs={4}>
          <TextField onChange={event => this.inputValue(event, [2,0])} label={<div>a<sub>13</sub></div>} type="number" value={a[2][0]}/>
        </Grid>
        <Grid item={true} xs={4}>
          <TextField onChange={event => this.inputValue(event, [2,1])} label={<div>a<sub>23</sub></div>} type="number" value={a[2][1]}/>
        </Grid>
        <Grid item={true} xs={4}>
          <TextField onChange={event => this.inputValue(event, [2,2])} label={<div>a<sub>33</sub></div>} type="number" value={a[2][2]}/>
        </Grid>
      </Grid>
    </Grid>)
  }
}

LatticeVectorsInput.propTypes = {
  // classes: PropTypes.object.isRequired,
  // theme: PropTypes.object.isRequired,
  // setCalculationType: PropTypes.func.isRequired,
};

export default withStyles(styles, {withTheme: true})(LatticeVectorsInput);
