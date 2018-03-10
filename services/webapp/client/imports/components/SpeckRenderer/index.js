import React from 'react';
import PropTypes from 'prop-types';
import Speck from 'speck-renderer';
import MobileDetect from 'mobile-detect';
import _ from 'lodash';
import { Random } from 'meteor/random';

import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';

import styles from './styles';

let md = new MobileDetect(window.navigator.userAgent);

class SpeckRenderer extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      if (!md.phone()) {
        this.speck = new Speck({
          canvasContainerID: `speck-root-${this.id}`,
          canvasID: `speck-canvas-${this.id}`,
        });
        this.container = document.querySelector(`#speck-root-${this.id}`);
        this.canvas = document.querySelector(`#speck-canvas-${this.id}`);
        const containerHeight = this.container.clientHeight;
        const canvasHeight = this.canvas.scrollHeight;
        this.canvas.style.marginTop = `${-(canvasHeight - containerHeight) /
          (2 * canvasHeight * 0.01)}%`;
        this.speck.setOptions({
          zoomRatio: containerHeight * this.props.zoom / canvasHeight,
        });
        // this.speck.gui.preset = "Cartoon";
        // this.speck.gui.preset = "BallAndStick";
        this.speck.gui.__folders.Detail.__controllers[2].setValue(canvasHeight);
        this.speck.loadStructure(this.props.xyz);
        window.addEventListener('resize', this.handleResize);
      }
    }, 0);
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.xyz !== this.props.xyz && this.speck) {
      this.speck.loadStructure(nextProps.xyz);
    }
  }
  componentWillUnmount() {
    if (!md.phone() && this.speck) {
      this.speck.destroy();
      this.speck = null;
      window.removeEventListener('resize', this.handleResize);
    }
  }
  speck = null;
  id = Random.id();
  container = null;
  canvas = null;
  handleResize = _.throttle(() => {
    if (!md.phone() && this.speck && this.canvas.offsetHeight !== 0) {
      const containerHeight = this.container.clientHeight;
      const canvasHeight = this.canvas.scrollHeight;
      this.canvas.style.marginTop = `${-(canvasHeight - containerHeight) /
        (2 * canvasHeight * 0.01)}%`;
      this.speck.setOptions({
        zoomRatio: containerHeight * this.props.zoom / canvasHeight,
      });
      this.speck.gui.__folders.Detail.__controllers[2].setValue(canvasHeight);
    }
  }, 2000).bind(this);
  render() {
    const { classes, theme, xyz } = this.props;
    return (
      <div className={`${classes.container} ${this.props.className}`}>
        <Hidden implementation="css" only="xs">
          <div id={`speck-root-${this.id}`} className={classes.speckContainer}>
            <canvas
              id={`speck-canvas-${this.id}`}
              className={classes.speckCanvas}
            />
          </div>
        </Hidden>
      </div>
    );
  }
}

SpeckRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  xyz: PropTypes.string.isRequired,
  zoom: PropTypes.number,
};
SpeckRenderer.defaultProps = {
  zoom: 1,
};

export default withStyles(styles, { withTheme: true })(SpeckRenderer);
