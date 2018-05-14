/* eslint-disable */
import React from 'react';
import { compose, withState, withHandlers, lifecycle } from 'recompose';

import Button from 'material-ui/Button';
import MobileStepper from 'material-ui/MobileStepper';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

import SpeckRenderer from '/client/imports/components/SpeckRenderer';
import { Molecule } from '/both/imports/tools/Molecule';
import xyzTools from '/both/imports/tools/xyz';
import Stepper from '/client/imports/components/Stepper';

import {
  RendererContainer,
  RendererRow,
  Column,
  SpeckContainer,
  Geometry,
} from './styles';

const GeometryOptimizationRendererPure = ({
  geometries,
  energies,
  selectedGeometryIndex,
  setSelectedGeometryIndex,
  autoplay,
}) => (
  <RendererContainer>
    <RendererRow>
      <Geometry>
        {`    Energy: ${energies[selectedGeometryIndex]} Ha\n`}
        {new Molecule({ xyz: geometries[selectedGeometryIndex] })
          .prettify({ positions: true })
          .xyz.split('\n')
          .slice(2)
          .join('\n')}
      </Geometry>
      <SpeckContainer>
        <SpeckRenderer
          xyz={xyzTools.prettyFormat({
            xyzString: geometries[selectedGeometryIndex],
          })}
        />
      </SpeckContainer>
    </RendererRow>
    {geometries.length > 1 ? (
      <Stepper
        autoplay={autoplay || false}
        steps={geometries.length}
        setStep={setSelectedGeometryIndex}
        activeStep={selectedGeometryIndex}
      />
    ) : null}
  </RendererContainer>
);

const GeometryOptimizationRenderer = compose(
  withState(
    'selectedGeometryIndex',
    'setSelectedGeometryIndex',
    ({ geometries }) => geometries.length - 1
  ),
  withHandlers({
    setLast: ({ setSelectedGeometryIndex, geometries }) => () =>
      setSelectedGeometryIndex(geometries.length - 1),
  }),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      // make sure to reset if geometries array gets shorter than previously
      if (nextProps.geometries.length - 1 < this.props.selectedGeometryIndex) {
        this.setState({
          selectedGeometryIndex: nextProps.geometries.length - 1,
        });
      }
    },
    componentDidUpdate(prevProps) {
      // move to last index on update if user has not moved position
      const previousIndex = prevProps.selectedGeometryIndex;
      const previousLastIndex = prevProps.geometries.length - 1;
      if (
        previousIndex === previousLastIndex &&
        prevProps.geometries.length !== this.props.geometries.length
      ) {
        this.props.setLast();
      }
    },
  })
)(GeometryOptimizationRendererPure);

export { GeometryOptimizationRenderer };
export default GeometryOptimizationRenderer;
