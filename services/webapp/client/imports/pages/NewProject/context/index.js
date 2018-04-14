import React, { createContext, Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import memoize from 'lodash/memoize';
import clone from 'lodash/clone';

const xyz = `\
He 0 0 0
Ne 1 0 0
`;

const Context = createContext();

class ContextProvider extends Component {
  state = {
    layers: [
      {
        type: 'calculation',
      },
    ],
    xyz,
  };
  componentDidUpdate() {
    // Check Layers
    const { layers } = this.state;
    console.log('layers', layers);
    layers.forEach((layer, index) => {
      // don't allow 2 sort or limit layers in a row
      if (layer.type === 'limit' || layer.type === 'sort') {
        const previousLayer = layers[index - 1];
        if (previousLayer && previousLayer.type === layer.type) {
          const newLayers = update(layers, { $splice: [[index, 1]] });
          this.setState({
            layers: newLayers,
          });
        }
      }
    });
  }
  /* ~~~ Handlers ~~~ */
  setXyz = memoize(xyz => {
    this.setState({
      xyz,
    });
  });
  setLayerType = memoize(index => {
    return type => {
      const layers = this.state.layers;
      if (layers[index].type !== type) {
        const newLayers = update(layers, { [index]: { type: { $set: type } } });
        this.setState({
          layers: newLayers,
        });
      }
    };
  });
  setOutputTypes = memoize(index => {
    return outputTypes => {
      const layers = this.state.layers;
      const newLayers = update(layers, {
        [index]: { outputTypes: { $set: outputTypes } },
      });
      this.setState({
        layers: newLayers,
      });
    };
  });
  setParameters = memoize(index => {
    return parameters => {
      const layers = this.state.layers;
      console.log('setParameters', JSON.stringify(parameters));
      const newLayers = update(layers, {
        [index]: { parameters: { $set: clone(parameters) } },
      });
      this.setState({
        layers: newLayers,
      });
    };
  });
  addLayer = () => {
    const layers = this.state.layers;
    const newLayers = update(layers, {
      $push: [{}],
    });
    this.setState({
      layers: newLayers,
    });
  };
  deleteLayer = index => {
    const layers = this.state.layers;
    const newLayers = update(layers, { $splice: [[index, 1]] });
    this.setState({
      layers: newLayers,
    });
  };
  render() {
    const value = {
      state: this.state,
      setXyz: this.setXyz,
      setLayerType: this.setLayerType,
      setOutputTypes: this.setOutputTypes,
      setParameters: this.setParameters,
      addLayer: this.addLayer,
      deleteLayer: this.deleteLayer,
    };
    console.log('value', value);
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }
}
ContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

const ContextConsumer = Context.Consumer;

const withContext = WrappedComponent => {
  const withContextWrapper = props => (
    <ContextProvider>
      <ContextConsumer>
        {context => <WrappedComponent {...props} context={context} />}
      </ContextConsumer>
    </ContextProvider>
  );
  withContextWrapper.displayName = withContext;
  return withContextWrapper;
};

export { Context, ContextProvider, ContextConsumer, withContext };
export default Context;
