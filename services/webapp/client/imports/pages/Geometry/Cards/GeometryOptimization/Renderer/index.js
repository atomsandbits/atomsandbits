import React from 'react';
import { compose, withStateHandlers, lifecycle } from 'recompose';

import Button from 'material-ui/Button';
import MobileStepper from 'material-ui/MobileStepper';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

import SpeckRenderer from '/client/imports/components/SpeckRenderer';
import { Molecule } from '/both/imports/tools/Molecule';
import xyzTools from '/both/imports/tools/xyz';

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
  increment,
  decrement,
}) => (
  <RendererContainer>
    <RendererRow>
      <Geometry>
        {`Energy: ${energies[selectedGeometryIndex]}\n`}
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
    ) : null}
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
      setLast: ({ selectedGeometryIndex }, { geometries }) => () => ({
        selectedGeometryIndex: geometries.length - 1,
      }),
    }
  ),
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
