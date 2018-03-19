import React from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import _ from 'lodash';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

import xyzTools from '/both/imports/tools/xyz';
import {
  getPossibleParameters,
  getParameterOptions,
  validateParameters,
} from '/both/imports/tools/parameters';
import MoleculeRenderer from '/client/imports/components/MoleculeRenderer';
import LatticeVectorsInput from './LatticeVectorsInput';
import KPointsInput from './KPointsInput';
import DropdownMenu from '/client/imports/components/DropdownMenu';

import styles from '/client/imports/pages/NewCalculation/styles';

if (!Session.get('xyz')) {
  Session.set(
    'xyz',
    xyzTools.prettyFormat({
      xyzString: `
  12
  benzene
  C        0.00000        1.40272        0.00000
  H        0.00000        2.49029        0.00000
  C       -1.21479        0.70136        0.00000
  H       -2.15666        1.24515        0.00000
  C       -1.21479       -0.70136        0.00000
  H       -2.15666       -1.24515        0.00000
  C        0.00000       -1.40272        0.00000
  H        0.00000       -2.49029        0.00000
  C        1.21479       -0.70136        0.00000
  H        2.15666       -1.24515        0.00000
  C        1.21479        0.70136        0.00000
  H        2.15666        1.24515        0.00000
  `,
    })
  );
}
if (!Session.get('parameters')) {
  // Default Parameters
  /*
  calculationType: "",
  periodicCalculationType: "",
  calculationMethod: "",
  basisSet: "",
  functional: "",
  gs: [],
  kPoints: [],
  charge: 0,
  multiplicity: 0
  */
  Session.set('parameters', {
    calculationType: 'geometryOptimization',
    calculationMethod: 'machineLearning',
    network: 'tensormol01',
    charge: 0,
    multiplicity: 1,
  });
}
class NewCalculation extends React.Component {
  state = {
    xyz: Session.get('xyz'),
    parameters: Session.get('parameters'),
  };

  setXyz = (xyz) => {
    this.setState({ xyz: xyz });
  };
  handleInput = (inputType) => (event) => {
    let parameters = this.state.parameters;
    parameters[inputType] = event.target.value;
    this.setState({ parameters: parameters });
  };
  setParameter = (parameterType) => {
    return (parameterValue) => {
      let parameters = this.state.parameters;
      parameters[parameterType] = parameterValue;
      this.setState({ parameters: parameters });
    };
  };
  unsetParameter = (parameterType) => {
    return () => {
      let parameters = this.state.parameters;
      delete parameters[parameterType];
      this.setState({ parameters: parameters });
    };
  };

  _submitCalculation = () => {
    // Create client-side checks system here
    // ----------
    if (this.state.parameters.calculationMethod === 'machineLearning') {
      let atoms = _.uniq(
        _.map(
          xyzTools.convertToCollection({ xyzString: this.state.xyz })
            .collection,
          (atomicCoord) => atomicCoord.atom
        )
      );
      let supportedAtoms = _.find(
        getParameterOptions(this.state.xyz, this.state.parameters, 'network'),
        { value: this.state.parameters.network }
      ).supportedAtoms;
      let unsupportedAtom = false;
      atoms.forEach((atom) => {
        if (supportedAtoms.indexOf(atom) === -1) {
          alert(`Only ${supportedAtoms} atoms are supported for this network.`);
          unsupportedAtom = true;
        }
      });
      if (unsupportedAtom) return;
    }
    // ---------
    let job = {
      xyz: xyzTools.normalize({ xyzString: this.state.xyz }),

      type: this.state.parameters.calculationType,
      periodicType: this.state.parameters.periodicCalculationType,
      method: this.state.parameters.calculationMethod,
      network: this.state.parameters.network,
      densityFit: this.state.parameters.densityFit
        ? this.state.parameters.densityFit
        : undefined,
      basisSet: this.state.parameters.basisSet,
      auxBasisSet: this.state.parameters.auxBasisSet
        ? this.state.parameters.auxBasisSet
        : undefined,
      pseudoPotential: this.state.parameters.pseudoPotential
        ? this.state.parameters.pseudoPotential
        : undefined,
      functional: this.state.parameters.functional,
      charge: this.state.parameters.charge ? this.state.parameters.charge : 0,
      multiplicity: this.state.parameters.multiplicity
        ? this.state.parameters.multiplicity
        : 1,
      kPoints: this.state.parameters.kPoints,
      latticeVectors: this.state.parameters.latticeVectors,
    };
    console.log('Submitting Job...', job);
    this.props.submitCalculation(job);
  };
  componentDidMount = () => {};
  componentWillUnmount = () => {
    Session.set('xyz', this.state.xyz);
    Session.set('parameters', this.state.parameters);
  };
  render() {
    const { classes, theme } = this.props;
    const possibleParameters = getPossibleParameters(this.state.parameters);
    return (
      <div className={classes.container}>
        <Grid container={true} spacing={0} justify="center">
          <MoleculeRenderer setXyz={this.setXyz} xyz={this.state.xyz} />{' '}
          {possibleParameters.indexOf('calculationType') !== -1 ? (
            <Grid item={true} xs={6} sm={4}>
              <DropdownMenu
                classes={this.props.classes}
                value={this.state.parameters.calculationType}
                unsetValue={this.unsetParameter('calculationType')}
                theme={this.props.theme}
                menuItems={getParameterOptions(
                  this.state.xyz,
                  this.state.parameters,
                  'calculationType'
                )}
                setValue={this.setParameter('calculationType')}
                label="Calculation"
              />
            </Grid>
          ) : null}
          {possibleParameters.indexOf('periodicCalculationType') !== -1 ? (
            <Grid item={true} xs={6} sm={4}>
              <DropdownMenu
                classes={this.props.classes}
                value={this.state.parameters.periodicCalculationType}
                unsetValue={this.unsetParameter('periodicCalculationType')}
                theme={this.props.theme}
                menuItems={getParameterOptions(
                  this.state.xyz,
                  this.state.parameters,
                  'periodicCalculationType'
                )}
                setValue={this.setParameter('periodicCalculationType')}
                label="Type"
              />
            </Grid>
          ) : null}
          {possibleParameters.indexOf('calculationMethod') !== -1 ? (
            <Grid item={true} xs={6} sm={4}>
              <DropdownMenu
                classes={this.props.classes}
                value={this.state.parameters.calculationMethod}
                unsetValue={this.unsetParameter('calculationMethod')}
                theme={this.props.theme}
                menuItems={getParameterOptions(
                  this.state.xyz,
                  this.state.parameters,
                  'calculationMethod'
                )}
                setValue={this.setParameter('calculationMethod')}
                label="Method"
              />
            </Grid>
          ) : null}
          {possibleParameters.indexOf('network') !== -1 ? (
            <Grid item={true} xs={6} sm={4}>
              <DropdownMenu
                classes={this.props.classes}
                value={this.state.parameters.network}
                unsetValue={this.unsetParameter('network')}
                theme={this.props.theme}
                menuItems={getParameterOptions(
                  this.state.xyz,
                  this.state.parameters,
                  'network'
                )}
                setValue={this.setParameter('network')}
                label="Network"
              />
            </Grid>
          ) : null}
          {possibleParameters.indexOf('functional') !== -1 ? (
            <Grid item={true} xs={6} sm={4}>
              <DropdownMenu
                classes={this.props.classes}
                value={this.state.parameters.functional}
                unsetValue={this.unsetParameter('functional')}
                theme={this.props.theme}
                menuItems={getParameterOptions(
                  this.state.xyz,
                  this.state.parameters,
                  'functional'
                )}
                setValue={this.setParameter('functional')}
                label="Functional"
              />
            </Grid>
          ) : null}
          {possibleParameters.indexOf('basisSet') !== -1 ? (
            <Grid item={true} xs={6} sm={4}>
              <DropdownMenu
                classes={this.props.classes}
                value={this.state.parameters.basisSet}
                unsetValue={this.unsetParameter('basisSet')}
                theme={this.props.theme}
                menuItems={getParameterOptions(
                  this.state.xyz,
                  this.state.parameters,
                  'basisSet'
                )}
                setValue={this.setParameter('basisSet')}
                label="Basis Set"
              />
            </Grid>
          ) : null}
          {possibleParameters.indexOf('densityFit') !== -1 ? (
            <Grid item={true} xs={12} sm={4}>
              <DropdownMenu
                classes={this.props.classes}
                value={this.state.parameters.densityFit}
                unsetValue={this.unsetParameter('densityFit')}
                theme={this.props.theme}
                menuItems={getParameterOptions(
                  this.state.xyz,
                  this.state.parameters,
                  'densityFit'
                )}
                setValue={this.setParameter('densityFit')}
                label="Density Fitting"
              />
            </Grid>
          ) : null}
          {possibleParameters.indexOf('auxBasisSet') !== -1 ? (
            <Grid item={true} xs={6} sm={4}>
              <DropdownMenu
                classes={this.props.classes}
                value={this.state.parameters.auxBasisSet}
                unsetValue={this.unsetParameter('auxBasisSet')}
                theme={this.props.theme}
                menuItems={getParameterOptions(
                  this.state.xyz,
                  this.state.parameters,
                  'auxBasisSet'
                )}
                setValue={this.setParameter('auxBasisSet')}
                label="Aux Basis Set"
              />
            </Grid>
          ) : null}
          {possibleParameters.indexOf('pseudoPotential') !== -1 ? (
            <Grid item={true} xs={6} sm={4}>
              <DropdownMenu
                classes={this.props.classes}
                value={this.state.parameters.pseudoPotential}
                unsetValue={this.unsetParameter('pseudoPotential')}
                theme={this.props.theme}
                menuItems={getParameterOptions(
                  this.state.xyz,
                  this.state.parameters,
                  'pseudoPotential'
                )}
                setValue={this.setParameter('pseudoPotential')}
                label="Pseduo Potential"
              />
            </Grid>
          ) : null}
          {possibleParameters.indexOf('charge') !== -1 ? (
            <Grid
              item={true}
              xs={12}
              sm={4}
              style={{
                padding: '23px 16px 0',
              }}
            >
              <TextField
                id="chargeInput"
                label="Charge"
                type="number"
                onChange={this.handleInput('charge')}
                value={this.state.parameters.charge}
                className={classes.chargeInput}
                inputProps={{
                  step: 1,
                }}
              />
            </Grid>
          ) : null}
          {possibleParameters.indexOf('multiplicity') !== -1 ? (
            <Grid item={true} xs={12} sm={4}>
              <DropdownMenu
                classes={this.props.classes}
                value={this.state.parameters.multiplicity}
                unsetValue={this.unsetParameter('multiplicity')}
                theme={this.props.theme}
                menuItems={getParameterOptions(
                  this.state.xyz,
                  this.state.parameters,
                  'multiplicity'
                )}
                setValue={this.setParameter('multiplicity')}
                label="Multiplicity"
              />
            </Grid>
          ) : null}
          <Grid item={true} xs={12} />{' '}
          {possibleParameters.indexOf('kPoints') !== -1 ? (
            <KPointsInput
              value={this.state.parameters.kPoints}
              setValue={this.setParameter('kPoints')}
              unsetValue={this.unsetParameter('kPoints')}
            />
          ) : null}
          {possibleParameters.indexOf('kPoints') !== -1 ? (
            <Grid item={true} sm={1} />
          ) : null}
          {possibleParameters.indexOf('latticeVectors') !== -1 ? (
            <LatticeVectorsInput
              value={this.state.parameters.latticeVectors}
              setValue={this.setParameter('latticeVectors')}
              unsetValue={this.unsetParameter('latticeVectors')}
            />
          ) : null}
          <Grid item={true} sm={1} />
          <Grid item={true} xs={12} />
          <Grid item={true} xs={1} sm={7} />
          <Grid
            item={true}
            xs={12}
            sm={3}
            style={{
              textAlign: 'right',
              marginTop: 30,
            }}
          >
            <Button
              raised={true}
              onClick={this._submitCalculation}
              color="primary"
              className={classes.submitButton}
            >
              Start
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

//<CalculationTypeOptions setValue={this.setCalculationType} unsetValue={this.unsetCalculationType} menuItems={getParameterOptions(this.state.xyz, this.state.parameters, "calculationType")}/>

NewCalculation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const runCalculation = gql`
  mutation runCalculation(
    $xyz: String!
    $type: String!
    $periodicType: String
    $method: String!
    $network: String
    $densityFit: String
    $basisSet: String
    $auxBasisSet: String
    $pseudoPotential: String
    $functional: String
    $charge: Int!
    $multiplicity: Int!
    $kPoints: [Int]
    $latticeVectors: [[Float]]
  ) {
    runCalculation(
      xyz: $xyz
      parameters: {
        type: $type
        periodicType: $periodicType
        method: $method
        network: $network
        densityFit: $densityFit
        basisSet: $basisSet
        auxBasisSet: $auxBasisSet
        pseudoPotential: $pseudoPotential
        functional: $functional
        charge: $charge
        multiplicity: $multiplicity
        kPoints: $kPoints
        latticeVectors: $latticeVectors
      }
    ) {
      id
    }
  }
`;

export default graphql(runCalculation, {
  props: ({ ownProps, mutate }) => ({
    submitCalculation: ({
      xyz,
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
      latticeVectors,
    }) =>
      mutate({
        variables: {
          xyz,
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
          latticeVectors,
        },
      })
        .then(({ data }) => {
          let primeCalculationId = data.runCalculation.id;
          ownProps.history.push(`/calculation/${primeCalculationId}`);
        })
        .catch((error) => {
          console.log('there was an error sending the query', error);
        }),
  }),
})(withStyles(styles, { withTheme: true })(NewCalculation));
