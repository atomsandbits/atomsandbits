import React, { createContext, Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { Session } from 'meteor/session';
import memoize from 'lodash/memoize';
import isEqual from 'lodash/isEqual';
import clone from 'lodash/clone';

import xyzSample from './molecule';

const Context = createContext();

class ContextProvider extends Component {
  state = {
    layers: Session.get('project_layers') || [
      {
        type: 'calculation',
        parameters: {
          type: 'conformerSearch',
          method: 'machineLearning',
        },
      },
      {
        type: 'calculation',
        parameters: {
          type: 'harmonicSpectra',
          method: 'machineLearning',
        },
      },
    ],
    xyz: Session.get('project_xyz') || xyzSample,
  };
  componentDidUpdate() {
    // Check Layers
    const { layers } = this.state;
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
  componentWillUnmount() {
    const { xyz, layers } = this.state;
    Session.set('project_xyz', xyz);
    Session.set('project_layers', layers);
  }
  /* ~~~ Handlers ~~~ */
  setXyz = memoize(xyz => {
    this.setState({
      xyz,
    });
  });
  setLayerType = memoize(index => {
    return type => {
      this.setState(({ layers }) => {
        if (layers[index].type !== type) {
          const newLayers = update(layers, {
            [index]: { type: { $set: type } },
          });
          return {
            layers: newLayers,
          };
        }
      });
    };
  });
  setOutputTypes = memoize(index => {
    return outputTypes => {
      // console.log('setOutputTypes', JSON.stringify(outputTypes));
      this.setState(({ layers }) => {
        const newLayers = update(layers, {
          [index]: { outputTypes: { $set: outputTypes } },
        });
        return {
          layers: newLayers,
        };
      });
    };
  });
  setParameters = memoize(index => {
    return parameters => {
      // console.log('setParameters', JSON.stringify(parameters));
      this.setState(({ layers }) => {
        if (isEqual(layers[index].parameters, parameters)) return;
        const newLayers = update(layers, {
          [index]: { parameters: { $set: parameters } },
        });
        return {
          layers: newLayers,
        };
      });
    };
  });
  addLayer = () => {
    if (this.state.layers.length === 6) {
      window.alert('Maximum of 6 layers for now...');
      return;
    }
    this.setState(({ layers }) => {
      const newLayers = update(layers, {
        $push: [{}],
      });
      return {
        layers: newLayers,
      };
    });
  };
  deleteLayer = index => {
    this.setState(({ layers }) => {
      const newLayers = update(layers, { $splice: [[index, 1]] });
      return {
        layers: newLayers,
      };
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
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }
}
ContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

const ContextConsumer = Context.Consumer;

const withProvider = WrappedComponent => {
  const withProviderWrapper = props => (
    <ContextProvider>
      <WrappedComponent {...props} />
    </ContextProvider>
  );
  withProviderWrapper.displayName = 'withProvider';
  return withProviderWrapper;
};

const withContext = WrappedComponent => {
  const withContextWrapper = props => (
    <ContextConsumer>
      {context => <WrappedComponent {...props} context={context} />}
    </ContextConsumer>
  );
  withContextWrapper.displayName = 'withContext';
  return withContextWrapper;
};

export { Context, ContextProvider, ContextConsumer, withContext, withProvider };
export default Context;
