import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, onlyUpdateForPropTypes } from 'recompose';

import CalculationLayer from '../../CalculationLayer';
import LimitLayer from '../../LimitLayer';
import SortLayer from '../../SortLayer';
import {
  LayerContent,
  LayerTypeDropdown,
  LayerContainer,
  OutputType,
  DeleteLayerIcon,
} from '../styles';

const enhance = compose(onlyUpdateForPropTypes);

const LayerPure = ({
  index,
  type,
  deleteLayer,
  inputTypes,
  outputTypes,
  getValidLayerTypes,
  setLayerType,
}) => (
  <LayerContainer>
    <LayerContent>
      {index > 1 ? (
        <DeleteLayerIcon onClick={() => deleteLayer(index)} />
      ) : null}
      {getValidLayerTypes(inputTypes).length !== 0 ? (
        <Fragment>
          <LayerTypeDropdown
            value={type}
            unsetValue={() => {}}
            menuItems={getValidLayerTypes(inputTypes)}
            setValue={setLayerType(index)}
            label="Layer"
          />
          {type === 'calculation' ? (
            <CalculationLayer index={index} />
          ) : type === 'limit' ? (
            <LimitLayer />
          ) : type === 'sort' ? (
            <SortLayer />
          ) : null}
          <OutputType>
            <sub>output</sub> {outputTypes ? outputTypes.join(' | ') : 'null'}
          </OutputType>
        </Fragment>
      ) : (
        'No valid layers for outputType'
      )}
    </LayerContent>
  </LayerContainer>
);
LayerPure.propTypes = {
  index: PropTypes.number.isRequired,
  type: PropTypes.string,
  deleteLayer: PropTypes.func.isRequired,
  inputTypes: PropTypes.array,
  outputTypes: PropTypes.array,
  getValidLayerTypes: PropTypes.func.isRequired,
  setLayerType: PropTypes.func.isRequired,
};

const Layer = enhance(LayerPure);

export { Layer };
export default Layer;
