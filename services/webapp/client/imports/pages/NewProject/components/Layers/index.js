import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  lifecycle,
  mapProps,
  onlyUpdateForPropTypes,
  withHandlers,
} from 'recompose';
import memoize from 'lodash/memoize';
import filter from 'lodash/filter';

import { withContext } from '../../context';
import Layer from './Layer';
import allLayerTypes from './types';

const enhance = compose(
  withContext,
  mapProps(({ context: { deleteLayer, setLayerType, state: { layers } } }) => ({
    layers,
    deleteLayer,
    setLayerType,
  })),
  withHandlers({
    getValidLayerTypes: () =>
      memoize((inputTypes) => {
        const validLayerTypes = filter(allLayerTypes, (layerType) =>
          layerType.hasValidInputType(inputTypes)
        );
        return validLayerTypes;
      }),
  }),
  lifecycle({
    shouldComponentUpdate(nextProps, nextState) {
      // console.log('~~~ Diff ~~~');
      // Object.keys(nextProps).forEach(key => {
      //   if (nextProps[key] !== this.props[key]) {
      //     console.log(key);
      //     console.log(JSON.stringify(this.props[key]));
      //     console.log(JSON.stringify(nextProps[key]));
      //   }
      // });
      // console.log('~~~~~~');
      return true;
    },
  }),
  onlyUpdateForPropTypes
);

const LayersPure = ({
  layers,
  deleteLayer,
  setLayerType,
  getValidLayerTypes,
}) => (
  <Fragment>
    {layers.map((layer, index) => (
      <Layer
        key={index}
        index={index}
        inputTypes={
          layers[index - 1]
            ? layers[index - 1].outputTypes
              ? layers[index - 1].outputTypes
              : []
            : ['geometry']
        }
        deleteLayer={deleteLayer}
        setLayerType={setLayerType}
        getValidLayerTypes={getValidLayerTypes}
        {...layer}
      />
    ))}
  </Fragment>
);
LayersPure.propTypes = {
  layers: PropTypes.array.isRequired,
  getValidLayerTypes: PropTypes.func.isRequired,
  setLayerType: PropTypes.func.isRequired,
  deleteLayer: PropTypes.func.isRequired,
};

const Layers = enhance(LayersPure);

export { Layers };
export default Layers;
