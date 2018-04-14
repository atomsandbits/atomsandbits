import React, { Fragment } from 'react';
import { compose, lifecycle, pure, withProps } from 'recompose';

import { ContextConsumer } from '../../context';
import CalculationOptions from '/client/imports/components/CalculationOptions';

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

const EnhancedCalculationLayer = enhance(CalculationLayerPure);

const CalculationLayer = props => (
  <ContextConsumer>
    {context => <EnhancedCalculationLayer {...props} context={context} />}
  </ContextConsumer>
);

export { CalculationLayer };
export default CalculationLayer;
