import React from 'react';
import PropTypes from 'prop-types';
import Speck from 'speck-renderer';
import { Session } from 'meteor/session';
import MobileDetect from 'mobile-detect';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';

import xyzTools from '/both/imports/tools/xyz';
import SpeckRenderer from '/client/imports/components/SpeckRenderer';

import styles from '/client/imports/pages/NewCalculation/styles';

let speck,
  lastGeometryInput,
  md = new MobileDetect(window.navigator.userAgent);

class MoleculeRenderer extends React.Component {
  state = {
    geometryInput: xyzTools.normalize({ xyzString: this.props.xyz })
  }
  onGeometryInput = (event) => {
    let xyz = event.target.value;
    this.props.setXyz(xyz);
    xyz = xyzTools.normalize({ xyzString: xyz });
    if (xyz) {
      if (xyz != lastGeometryInput) {
        this.setState({ geometryInput: xyz });
        lastGeometryInput = xyz;
      }
    }
  };
  render() {
    const { classes, theme } = this.props;
    console.log("Renderered...")
    return (
      <Grid container={true} spacing={0}>
        <Grid item={true} xs={12} sm={6}>
          <div className={classes.xyzareaContainer} style={{height: '100%'}}>
            <textarea value={this.props.xyz} onChange={this.onGeometryInput} className={classes.geometryTextarea}/>
          </div>
        </Grid>
        <Grid item={true} xs={12} sm={6}>
          <SpeckRenderer xyz={this.state.geometryInput} />
        </Grid>
      </Grid>
    )
  }
}

MoleculeRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  setXyz: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(MoleculeRenderer);
