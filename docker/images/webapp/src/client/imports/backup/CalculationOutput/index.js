import React from 'react';
import PropTypes from 'prop-types';
import Speck from 'speck-renderer';
import MobileDetect from 'mobile-detect';
import {sprintf} from 'sprintf-js';

import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {withRouter} from 'react-router-dom';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import {LinearProgress} from 'material-ui/Progress';

import Hidden from 'material-ui/Hidden';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import prettyFormat from '/both/imports/tools/pretty-format';
import xyzTools from '/both/imports/tools/xyz';
import styles from './styles';

let speck,
  speckLoaded,
  refetchInterval,
  md = new MobileDetect(window.navigator.userAgent);

class Calculation extends React.Component {
  state = {
    calculationCompleted: (
      this.props.data.calculation
      ? this.props.data.calculation.completedAt
      : false)
  }
  handleInput = inputType => event => {
    this.setState({
      [`${inputType}Value`]: event.target.value
    });
  };
  componentWillMount() {
    let calculationCompleted = this.state.calculationCompleted;
    if (!calculationCompleted) {
      refetchInterval = setInterval(() => {
        console.log("Fetching calculation...")
        this.props.data.refetch();
        calculationCompleted = this.props.data.calculation.completedAt;
        if (calculationCompleted) {
          console.log("Calculation completed...");
          this.setState({calculationCompleted: this.props.data.calculation.completedAt})
          clearInterval(refetchInterval);
        }
      }, 1000);
    }
  }
  componentWillUpdate() {
    let outputContainer = document.getElementById("output-container");
    if (outputContainer) {
      let scrollDistance = Math.ceil((outputContainer.scrollHeight - outputContainer.scrollTop) / 10) * 10;
      let scrollHeight = Math.ceil(outputContainer.clientHeight / 10) * 10;
      if (scrollDistance === scrollHeight) {
        setTimeout(() => {
          outputContainer.scrollTop = outputContainer.scrollHeight;
        }, 50)
      }
    }
  }
  componentWillUnmount() {
    clearInterval(refetchInterval);
    if (speckLoaded) {
      if (!md.phone()) {
        speck.destroy();
        speck = null;
        speckLoaded = false;
      }
    }
  }
  render() {
    const {classes, theme} = this.props;
    const {loading, error, calculation} = this.props.data;
    if (loading && !calculation) {
      console.log("No calculation data yet...");
      return (<div><LinearProgress/>
      </div>);
    }
    if (error) {
      console.log(error);
      setTimeout(() => {
        this.props.history.push("/");
      }, 0)
      return <div className={classes.container}/>;
    }
    const {output} = (calculation);
    return (<div className={classes.container}>
      {output}
    </div>)
  }
}

Calculation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const calculationQuery = gql `
  query calculation($id: String!) {
    calculation(id: $id) {
      id,
      output,
      completedAt
    }
  }
`;

export default withRouter(graphql(calculationQuery, {
  options: (ownProps) => {
    return ({
      variables: {
        id: ownProps.match.params.primeCalculationId
      }
    });
  }
})(withStyles(styles, {withTheme: true})(Calculation)));
