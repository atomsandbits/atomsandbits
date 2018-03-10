import React from 'react';
import { compose, withStateHandlers } from 'recompose';

import Button from 'material-ui/Button';
import MobileStepper from 'material-ui/MobileStepper';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

import SpeckRenderer from '/client/imports/components/SpeckRenderer';
import xyzTools from '/both/imports/tools/xyz';

import { RendererContainer, Column, Geometry } from './styles';

const GeometryOptimizationRendererPure = ({
  geometries,
  energies,
  selectedGeometryIndex,
  increment,
  decrement,
}) => (
  <RendererContainer>
    <Column>
      <Geometry>
        {`Energy: ${energies[selectedGeometryIndex]}\n`}
        {geometries[selectedGeometryIndex]}
      </Geometry>
    </Column>
    <Column>
      <SpeckRenderer
        xyz={xyzTools.prettyFormat({
          xyzString: geometries[selectedGeometryIndex],
        })}
      />
    </Column>
    <MobileStepper
      type="dots"
      steps={geometries.length}
      position="static"
      activeStep={selectedGeometryIndex}
      nextButton={
        <Button
          dense
          onClick={increment}
          disabled={selectedGeometryIndex === geometries.length - 1}
        >
          Next
          <KeyboardArrowRight />
        </Button>
      }
      backButton={
        <Button
          dense
          onClick={decrement}
          disabled={selectedGeometryIndex === 0}
        >
          <KeyboardArrowLeft />
          Back
        </Button>
      }
    />
  </RendererContainer>
);

const GeometryOptimizationRenderer = compose(
  withStateHandlers(
    ({ geometries }) => ({
      selectedGeometryIndex: geometries.length - 1,
    }),
    {
      increment: ({ selectedGeometryIndex }, { geometries }) => () => ({
        selectedGeometryIndex:
          selectedGeometryIndex < geometries.length - 1
            ? selectedGeometryIndex + 1
            : selectedGeometryIndex,
      }),
      decrement: ({ selectedGeometryIndex }) => () => ({
        selectedGeometryIndex:
          selectedGeometryIndex > 0 ? selectedGeometryIndex - 1 : 0,
      }),
    }
  )
)(GeometryOptimizationRendererPure);

export { GeometryOptimizationRenderer };
export default GeometryOptimizationRenderer;
