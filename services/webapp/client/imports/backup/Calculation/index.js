import React from 'react';
import PropTypes from 'prop-types';
import Speck from 'speck-renderer';
import MobileDetect from 'mobile-detect';
import {sprintf} from 'sprintf-js';
import {Link} from 'react-router-dom';
import moment from 'moment';

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
import LaunchIcon from 'material-ui-icons/Launch';

import SpeckRenderer from '/client/imports/components/SpeckRenderer';
import GeometryOptimizationRenderer from './GeometryOptimizationRenderer';
import prettyFormat from '/both/imports/tools/pretty-format';
import xyzTools from '/both/imports/tools/xyz';
import styles from '/client/imports/pages/NewCalculation/styles';


class Calculation extends React.Component {
  state = {
    calculationCompleted: (
      this.props.data.calculation
      ? this.props.data.calculation.completedAt
      : false)
  }
  refetchInterval = null;
  firstRenderWithData = true;
  handleInput = inputType => event => {
    this.setState({
      [`${inputType}Value`]: event.target.value
    });
  };
  componentWillMount() {
    let calculationCompleted = this.state.calculationCompleted;
    if (!calculationCompleted) {
      this.refetchInterval = setInterval(() => {
        console.log("Fetching calculation...")
        this.props.data.refetch();
        calculationCompleted = this.props.data.calculation.completedAt;
        if (calculationCompleted) {
          console.log("Calculation completed...");
          this.setState({calculationCompleted: this.props.data.calculation.completedAt})
          clearInterval(this.refetchInterval);
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
    clearInterval(this.refetchInterval);
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
    const {id, startedAt, completedAt, output} = (calculation);
    const calculationError = calculation.error,
      calculationErrorMessage = calculation.errorMessage;
    console.log(calculation);
    const {
      type,
      periodicType,
      method,
      network,
      densityFit,
      basisSet,
      auxBasisSet,
      pseudoPotential,
      functional,
      multiplicity,
      charge,
      kPoints,
      latticeVectors
    } = (calculation.parameters);
    const {atomicCoords, name, atomCount} = (calculation.geometry);
    const xyz = xyzTools.prettyFormat({xyzString: `${atomCount}\n${name}\n${atomicCoords}`});
    if (this.firstRenderWithData) {
      setTimeout(function() {
        let outputContainer = document.getElementById("output-container");
        outputContainer.scrollTop = outputContainer.scrollHeight;
        this.firstRenderWithData = false;
      }, 0);
    }
    return (<div className={classes.container}>
      <Grid container={true} spacing={0} justify="center">
        <Grid item={true} xs={12} sm={6}>
          <div className={classes.geometryTextareaContainer}>
            <textarea disabled="disabled" value={xyz} className={classes.geometryTextarea}/>
          </div>
        </Grid>
        <Grid item={true} xs={12} sm={6}>
          <SpeckRenderer xyz={xyz} />
        </Grid>
        <Grid item={true} xs={6} sm={4}>
          <div className={classes.parameterContainer}>
            <Typography type="body1" color="textSecondary">Calculation</Typography>
            <Typography type="subheading">{prettyFormat(type)}</Typography>
          </div>
        </Grid>
        {
          periodicType
            ? <Grid item={true} xs={6} sm={4}>
                <div className={classes.parameterContainer}>
                  <Typography type="body1" color="textSecondary">Type</Typography>
                  <Typography type="subheading">{prettyFormat(periodicType)}</Typography>
                </div>
              </Grid>
            : null
        }
        <Grid item={true} xs={6} sm={4}>
          <div className={classes.parameterContainer}>
            <Typography type="body1" color="textSecondary">Method</Typography>
            <Typography type="subheading">{prettyFormat(method)}</Typography>
          </div>
        </Grid>
        {
          network
            ? <Grid item={true} xs={12} sm={4}>
              <div className={classes.parameterContainer}>
                <Typography type="body1" color="textSecondary">Network</Typography>
                <Typography type="subheading">{prettyFormat(network)}</Typography>
              </div>
            </Grid>
            : null
        }
        {
          functional
            ? <Grid item={true} xs={6} sm={4}>
                <div className={classes.parameterContainer}>
                  <Typography type="body1" color="textSecondary">Functional</Typography>
                  <Typography type="subheading">{prettyFormat(functional)}</Typography>
                </div>
              </Grid>
            : null
        }
        {
          basisSet
            ? <Grid item={true} xs={12} sm={4}>
               <div className={classes.parameterContainer}>
                  <Typography type="body1" color="textSecondary">Basis Set</Typography>
                  <Typography type="subheading">{prettyFormat(basisSet)}</Typography>
               </div>
              </Grid>
            : null
        }
        {
          densityFit
            ? <Grid item={true} xs={6} sm={4}>
                <div className={classes.parameterContainer}>
                  <Typography type="body1" color="textSecondary">Density Fitting</Typography>
                  <Typography type="subheading">{prettyFormat(densityFit)}</Typography>
                </div>
              </Grid>
            : null
        }
        {
          auxBasisSet
            ? <Grid item={true} xs={6} sm={4}>
                <div className={classes.parameterContainer}>
                  <Typography type="body1" color="textSecondary">Aux Basis Set</Typography>
                  <Typography type="subheading">{prettyFormat(auxBasisSet)}</Typography>
                </div>
              </Grid>
            : null
        }
        {
          pseudoPotential
            ? <Grid item={true} xs={6} sm={4}>
                <div className={classes.parameterContainer}>
                  <Typography type="body1" color="textSecondary">Pseudo Potential</Typography>
                  <Typography type="subheading">{prettyFormat(pseudoPotential)}</Typography>
                </div>
              </Grid>
            : null
        }
        <Grid item={true} xs={6} sm={4}>
          <div className={classes.parameterContainer}>
            <Typography type="body1" color="textSecondary">Charge</Typography>
            <Typography type="subheading">{charge}</Typography>
          </div>
        </Grid>
        <Grid item={true} xs={6} sm={4}>
          <div className={classes.parameterContainer}>
            <Typography type="body1" color="textSecondary">Multiplicity</Typography>
            <Typography type="subheading">{prettyFormat(multiplicity)}</Typography>
          </div>
        </Grid>
        <Grid item={true} xs={12}/> {
          kPoints
            ? <Grid item={true} xs={6} sm={4}>
                <div className={classes.parameterContainer}>
                  <Typography type="body1" color="textSecondary">K-Points</Typography>
                  <Typography type="subheading" style={{
                      whiteSpace: 'pre',
                      fontFamily: 'Space Mono'
                    }}>
                    {sprintf(`%1f %4f %4f`, kPoints[0], kPoints[1], kPoints[2])}
                  </Typography>
                </div>
              </Grid>
            : null
        }
        {
          latticeVectors
            ? <Grid item={true} xs={6} sm={4}>
                <div className={classes.parameterContainer}>
                  <Typography type="body1" color="textSecondary">Lattice Vectors (Å)</Typography>
                  <Typography type="subheading" style={{
                      overflow: 'auto',
                      whiteSpace: 'pre',
                      fontFamily: 'Space Mono',
                      fontSize: '0.875rem'
                    }}>
                    {
                      latticeVectors.map(latticeSet => {
                        return sprintf(`%7.5f %10.5f %10.5f`, latticeSet[0], latticeSet[1], latticeSet[2]) + "\n"
                      })
                    }
                  </Typography>
                </div>
              </Grid>
            : null
        }
        {
          type === "geometryOptimization"
            ? <Grid item={true} xs={12} style={{marginTop: 40}}><GeometryOptimizationRenderer output={output} initialAtomicCoords={calculation.geometry.atomicCoords} network={network}/></Grid>
            : null
        }
        <Grid item={true} md={1}/>
        <Grid item={true} xs={12} md={10} style={{
            margin: '0 auto',
            position: 'relative'
          }}>
          <span className={classes.outputLinkContainer}><Link to={`/calculation/${id}/output`} className={classes.outputLink}><LaunchIcon /></Link></span>
          <div id="output-container" className={classes.outputContainer}>
            <span className={classes.outputLabel}>output</span>
            <div className={classes.output}>
              {
                calculationError
                  ? `${output}\n    Error:\n    ${calculationErrorMessage}`
                  : !startedAt
                    ? "\n    Waiting to start calculation..."
                    : (
                      !completedAt
                      ? (
                        output
                        ? `${output}\n\n    Running...`
                        : '\n\n    Running...')
                      : (`${output}\n    Calculation complete.`))
              }
            </div>
            {
              completedAt
                ? <span className={classes.runTimeContainer}>Calculation time - {moment.duration(moment(completedAt).diff(moment(startedAt))).humanize()}...</span>
                : null
            }
          </div>
        </Grid>
      </Grid>
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
      startedAt,
      completedAt,
      error,
      errorMessage,
      parameters {
        type,
        periodicType,
        method,
        network,
        densityFit,
        basisSet,
        auxBasisSet,
        pseudoPotential,
        functional,
        charge,
        multiplicity,
        kPoints,
        latticeVectors
      },
      geometry {
        atomCount,
        atomicCoords,
        name
      }
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
