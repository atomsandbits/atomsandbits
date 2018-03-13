import React from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';

import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import MobileStepper from 'material-ui/MobileStepper';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

import SpeckRenderer from '/client/imports/components/SpeckRenderer';
import xyzTools from '/both/imports/tools/xyz';
import styles from "./styles";

class GeometryOptimizationRenderer extends React.Component {
  state = {
    disableGoingToLast: false,
    xyzIndex: 0,
    xyzs: []
  };
  handleNext = () => {
    const newXyzIndex = this.state.xyzIndex + 1;
    this.setState({
      xyzIndex: newXyzIndex
    });
    if (newXyzIndex == this.state.xyzs.length - 1)
      this.setState({ disableGoingToLast: false });
    else
      this.setState({ disableGoingToLast: true });
  };

  handleBack = () => {
    const newXyzIndex = this.state.xyzIndex - 1;
    this.setState({
      xyzIndex: newXyzIndex
    });
    if (newXyzIndex == this.state.xyzs.length - 1)
      this.setState({ disableGoingToLast: false });
    else
      this.setState({ disableGoingToLast: true });
  };
  updateIterations() {
    const { output, network } = this.props;
    if (!output)
      return
    let geometries = [];
    if (!network) {
      /* PySCF Code */
      // let splitOutput = output.split("New geometry (unit Bohr)");
      // for (let i = 1; i < splitOutput.length - 1; i++) {
      //   let xyz = "";
      //   xyz = splitOutput[i].split("********")[0]
      //   let atomicCoords = xyz.trim().split('\n');
      //   atomicCoords = atomicCoords.map(atomicCoord => {
      //     splitAtomicCoord = atomicCoord.trim().split(" ");
      //     splitAtomicCoord.splice(0, 1);
      //     splitAtomicCoord = splitAtomicCoord.filter(
      //       value => value === ""
      //       ? false
      //       : true)
      //     splitAtomicCoord = splitAtomicCoord.map(
      //       value => !isNaN(value)
      //       ? (value * 0.52917721092).toFixed(8)
      //       : value)
      //     return splitAtomicCoord.join(" ");
      //   })
      //   energy = splitOutput[i].split(`${i} Energy: `)[1].split("\n")[0]
      //   let geometryName = xyzTools.getEmpiricalFormula({xyzString: atomicCoords.join("\n")});
      //   geometryName = geometryName + ` ITERATION=${i - 1} ENERGY=${energy}`;
      //   geometries.push(xyzTools.prettyFormat({geometryName: geometryName, xyzString: atomicCoords.join("\n")}));
      // }
      /* Psi4 Code */
      let splitOutput = output.split("Structure for next step:\n	Cartesian Geometry (in Angstrom)\n");
      let iteration = 0;
      splitOutput.forEach((outputChunk) => {
        let atomicCoords, energy, geometryName, finalXyz;
        if (iteration === 0) {
          atomicCoords = this.props.initialAtomicCoords;
          if (outputChunk.split("Total Energy =")[1]){
            energy = outputChunk.split("Total Energy =")[1].split("\n")[0].trim();
          }
        } else if (iteration !== 50) {
          atomicCoords = outputChunk.split("--------------------------")[0].trim();
          if (outputChunk.split("Current energy   :")[1]) {
            energy = outputChunk.split("Current energy   :")[1].split("\n")[0].trim();
          }
        } else {
          return;
        }
        geometryName = xyzTools.getEmpiricalFormula({ xyzString: atomicCoords });
        geometryName = `${geometryName} ITERATION=${iteration} ENERGY=${energy}`;
        finalXyz = xyzTools.prettyFormat({ geometryName: geometryName, xyzString: atomicCoords })

        geometries.push(finalXyz)

        iteration++;
      });
    } else {
      /* TensorMol Code */
      let splitOutput = output.split("~~~~~~~");
      for (let i = 1; i < splitOutput.length - 1; i++) {
        let xyz = "";
        xyz = splitOutput[i].split("Comment:")[1].trim()
          .split("\n")
        let comment = xyz.shift();
        let energy = Number(comment.split("Energy ")[1])
          .toFixed(8)
        let atomicCoords = xyz;
        atomicCoords = atomicCoords.map(atomicCoord => {
            let splitAtomicCoord = _.filter(atomicCoord.trim()
              .split(" "), value => value !== "");
            splitAtomicCoord = splitAtomicCoord.map(
              value => !isNaN(value) ?
              (Number(value))
              .toFixed(8) :
              value)
            return splitAtomicCoord.join(" ");
          })
          .join("\n")
        let geometryName = xyzTools.getEmpiricalFormula({ xyzString: atomicCoords });
        geometryName = `${geometryName} ITERATION=${i - 1} ENERGY=${energy}`;
        let finalXyz = xyzTools.prettyFormat({ geometryName: geometryName, xyzString: atomicCoords })
        geometries.push(finalXyz)
      }
    }
    this.setState({ xyzs: geometries });
    if (!this.state.disableGoingToLast)
      this.setState({
        xyzIndex: geometries.length - 1
      })
  }
  componentWillMount() {
    this.updateIterations();
  }
  componentWillReceiveProps() {
    this.updateIterations();
  }
  render() {
    const { theme, classes } = this.props;
    const xyz = this.state.xyzs[this.state.xyzIndex];
    if (!xyz)
      return <div/>
    return (<Hidden implementation="css" mdDown={true}>
      <Grid container={true} spacing={0} justify="center">
        <Grid item={true} xs={12} sm={6}>
          <div className={classes.geometryTextareaContainer}>
            <textarea disabled="disabled" value={xyz} className={classes.geometryTextarea}/>
          </div>
          <MobileStepper type="dots" steps={this.state.xyzs.length} position="static" activeStep={this.state.xyzIndex} className={classes.stepper} nextButton={<Button dense onClick = {
              this.handleNext
            }
            disabled = {
              this.state.xyzIndex === this.state.xyzs.length - 1
            }> Next {
              theme.direction === 'rtl'
                ? <KeyboardArrowLeft/>
                : <KeyboardArrowRight/>
            }
            </Button>
            } backButton={<Button dense onClick = {
              this.handleBack
            }
            disabled = {
              this.state.xyzIndex === 0
            } > {
              theme.direction === 'rtl'
                ? <KeyboardArrowRight/>
                : <KeyboardArrowLeft/>
            }
            Back </Button>}/>
        </Grid>
        <Grid item={true} xs={12} sm={6}>
          <SpeckRenderer xyz={xyz}/>
        </Grid>
      </Grid>
    </Hidden>)
  }
}

GeometryOptimizationRenderer.propTypes = {
  // classes: PropTypes.object.isRequired,
  // theme: PropTypes.object.isRequired,
  // setCalculationType: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(GeometryOptimizationRenderer);
