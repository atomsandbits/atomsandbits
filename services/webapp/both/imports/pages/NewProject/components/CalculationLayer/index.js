import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, lifecycle, withProps } from 'recompose';

import { ContextConsumer } from '../../context';
import CalculationOptions from '/both/imports/components/CalculationOptions';

const enhance = compose(
  lifecycle({
    componentDidMount() {
      const index = this.props.index;
      this.props.context.setLayerType(index)('calculation');
    },
  }),
  withProps(({ index, context: { setOutputTypes, setParameters } }) => ({
    setOutputTypes: setOutputTypes(index),
    setParameters: setParameters(index),
  }))
);

const defaultInputTypes = ['geometry'];

const CalculationLayerPure = ({
  index,
  setOutputTypes,
  setParameters,
  context: { state: { layers } },
}) => (
  <Fragment>
    <CalculationOptions
      parameters={layers[index].parameters || {}}
      inputTypes={
        layers[index - 1] ? layers[index - 1].outputTypes : defaultInputTypes
      }
      setOutputTypes={setOutputTypes}
      setParameters={setParameters}
    />
  </Fragment>
);
CalculationLayerPure.propTypes = {
  index: PropTypes.number,
  setOutputTypes: PropTypes.func,
  setParameters: PropTypes.func,
  context: PropTypes.shape({ state: PropTypes.object }),
};
const EnhancedCalculationLayer = enhance(CalculationLayerPure);

const CalculationLayer = (props) => (
  <ContextConsumer>
    {(context) => <EnhancedCalculationLayer {...props} context={context} />}
  </ContextConsumer>
);

export { CalculationLayer };
export default CalculationLayer;
