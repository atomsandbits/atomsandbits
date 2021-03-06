import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

import _ from 'lodash';
import { Random } from 'meteor/random';

import {
  MoleculeImage,
  SpeckRendererContainer,
  SpeckCanvasContainer,
  SpeckCanvas,
} from './styles';

let SpeckRenderer;

if (Meteor.isClient) {
  import Speck from 'speck-renderer';
  import MobileDetect from 'mobile-detect';
  let md = new MobileDetect(window.navigator.userAgent);
  class SpeckRendererComponent extends React.Component {
    state = {
      mobileDevice: false,
    };
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
          const resolution = canvasHeight > 256 ? canvasHeight : 256;
          this.speck.gui.__folders.Detail.__controllers[2].setValue(resolution);
          this.speck.loadStructure(this.props.xyz);
          window.addEventListener('resize', this.handleResize);
        } else {
          this.setState({ mobileDevice: true });
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
        const resolution = canvasHeight > 256 ? canvasHeight : 256;
        this.speck.gui.__folders.Detail.__controllers[2].setValue(resolution);
      }
    }, 2000).bind(this);
    render() {
      const { placeholder } = this.props;
      const { mobileDevice } = this.state;
      return (
        <SpeckRendererContainer>
          {!mobileDevice ? (
            <SpeckCanvasContainer id={`speck-root-${this.id}`}>
              <SpeckCanvas id={`speck-canvas-${this.id}`} />
            </SpeckCanvasContainer>
          ) : null}
          {mobileDevice && placeholder ? (
            <MoleculeImage src={placeholder} />
          ) : null}
        </SpeckRendererContainer>
      );
    }
  }
  SpeckRendererComponent.propTypes = {
    placeholder: PropTypes.string,
    xyz: PropTypes.string.isRequired,
    zoom: PropTypes.number,
  };
  SpeckRendererComponent.defaultProps = {
    zoom: 1,
  };

  SpeckRenderer = SpeckRendererComponent;
} else {
  const SpeckRendererComponent = ({ placeholder }) => (
    <SpeckRendererContainer>
      {placeholder ? <MoleculeImage src={placeholder} /> : null}
    </SpeckRendererContainer>
  );
  SpeckRendererComponent.propTypes = {
    placeholder: PropTypes.string,
  };

  SpeckRenderer = SpeckRendererComponent;
}

export default SpeckRenderer;
