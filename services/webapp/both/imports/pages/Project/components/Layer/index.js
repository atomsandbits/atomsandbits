import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  onlyUpdateForPropTypes,
  withProps,
  withState,
} from 'recompose';

import { Stepper } from '/both/imports/components/Stepper';
import Chart from '/both/imports/pages/Geometry/Cards/HarmonicSpectrum/Chart';
import {
  LayerContainer,
  LayerContent,
  GeometryLink,
  LoadingIndicator,
  // ResultContainer,
  Parameters,
  LeftSide,
  RightSide,
  SystemImage,
  TopLeft,
  TopRight,
} from './styles';

const prettyPropertyLabel = ({ parameters }) => {
  switch (parameters.method) {
    case 'machineLearning':
      return `${parameters.network}`;
    default:
      return `${parameters.method} ${parameters.basisSet} ${
        parameters.functional ? parameters.functional : ''
      }`;
  }
};
const capitalize = function(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const enhance = compose(
  withProps(({ output }) => ({
    output: output || {},
  })),
  withState('activeStep', 'setActiveStep', 0),
  onlyUpdateForPropTypes
);

const LayerPure = ({
  activeStep,
  setActiveStep,
  type,
  parameters: { limit, sort, calculation },
  output: {
    geometry,
    geometry_,
    geometry__,
    energy,
    energy_,
    energy__,
    freeEnergy,
    freeEnergy_,
    frequency_,
    intensity_,
    frequency__,
    intensity__,
  },
  completed,
}) => (
  <LayerContainer>
    <TopLeft>
      <div>Layer</div>
      <div>{capitalize(type.toLowerCase())}</div>
    </TopLeft>
    {!completed ? (
      <TopRight>
        <LoadingIndicator size={20} thickness={5} />
      </TopRight>
    ) : null}
    <Parameters>
      {calculation
        ? `${calculation.type} ${prettyPropertyLabel({
            parameters: calculation,
          })}`
        : null}
    </Parameters>
    <LayerContent>
      {geometry ? (
        <Fragment>
          <LeftSide>
            <GeometryLink to={`/geometry/${geometry.id}`}>
              <SystemImage src={`/geometry/${geometry.id}/image/medium`} />
            </GeometryLink>
          </LeftSide>
          <RightSide>
            {energy ? `Energy: ${energy}` : null}
            {freeEnergy ? `Free Energy (STP): ${freeEnergy}` : null}
            {frequency_ ? (
              <Chart frequencies={frequency_} intensities={intensity_} />
            ) : null}
          </RightSide>
        </Fragment>
      ) : null}
      {geometry_ ? (
        <Fragment>
          <LeftSide>
            <GeometryLink to={`/geometry/${geometry_[activeStep].id}`}>
              <SystemImage
                src={`/geometry/${geometry_[activeStep].id}/image/medium`}
              />
            </GeometryLink>
            <Stepper
              activeStep={activeStep}
              setStep={setActiveStep}
              steps={geometry_.length}
              speed={frequency__ ? 600 : 300}
            />
          </LeftSide>
          <RightSide>
            {energy_ ? `Energy: ${energy_[activeStep]}` : null}
            {freeEnergy_
              ? `Free Energy (STP): ${freeEnergy_[activeStep]}`
              : null}
            {frequency__ ? (
              <Chart
                frequencies={frequency__[activeStep]}
                intensities={intensity__[activeStep]}
              />
            ) : null}
          </RightSide>
        </Fragment>
      ) : null}
    </LayerContent>
  </LayerContainer>
);
LayerPure.propTypes = {
  activeStep: PropTypes.number.isRequired,
  setActiveStep: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  parameters: PropTypes.object.isRequired,
  output: PropTypes.object,
  completed: PropTypes.bool.isRequired,
};
LayerPure.defaultProps = {
  output: {},
};

const Layer = enhance(LayerPure);

export { Layer };
export default Layer;
