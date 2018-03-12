import React from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  branch,
  renderComponent,
  mapProps,
  withState,
} from 'recompose';
import { withData } from './withData';

import { LinearProgress } from 'material-ui/Progress';

import AppLayout from '/client/imports/components/AppLayout';
import { EnergyCard } from './Cards/Energy';
import { ForceCard } from './Cards/Force';
import { GeometryOptimizationCard } from './Cards/GeometryOptimization';
import { Tags } from './Tags';

import { defaults, Line as LineChart } from 'react-chartjs-2';

import Expandable from '/client/imports/components/Expandable';
import { Molecule } from '/both/imports/tools/Molecule';
import xyzTools from '/both/imports/tools/xyz';
import {
  AtomicCoords,
  AtomicCoordsContainer,
  CardProperty,
  CardPropertyLabel,
  CardPropertyRow,
  CardTitle,
  ColumnContent,
  ExpandableCardDetails,
  ExpandableCardSummary,
  ExpansionPanel,
  GeometryCalculationColumn,
  GeometryInformationColumn,
  GeometryPageContainer,
  GeometryPageContent,
  Link,
  Links,
  SpeckRenderer,
} from './styles';

const GeometryPure = ({
  geometry,
  energies,
  forces,
  geometryOptimizations,
  harmonicSpectra,
  refetch,
}) => (
  <AppLayout
    mobileOnlyToolbar
    alwaysRaised
    title="Geometry"
    appContent={
      <GeometryPageContainer>
        {console.log(geometry)}
        <GeometryPageContent>
          <GeometryCalculationColumn>
            <ColumnContent>
              <EnergyCard energies={energies} />
              <ForceCard forces={forces} />
              <GeometryOptimizationCard
                geometryOptimizations={geometryOptimizations}
              />
            </ColumnContent>
          </GeometryCalculationColumn>
          <GeometryInformationColumn>
            <ColumnContent>
              <SpeckRenderer
                xyz={xyzTools.prettyFormat({
                  xyzString: geometry.atomicCoords,
                })}
              />
              <Tags tags={geometry.tags} refetch={refetch} />
              <AtomicCoordsContainer>
                <CardTitle>Atomic Coordinates</CardTitle>
                <AtomicCoords>
                  {new Molecule({ xyz: geometry.atomicCoords })
                    .prettify({ positions: true })
                    .xyz.split('\n')
                    .slice(2)
                    .join('\n')}
                </AtomicCoords>
              </AtomicCoordsContainer>
            </ColumnContent>
          </GeometryInformationColumn>
        </GeometryPageContent>
      </GeometryPageContainer>
    }
  />
);

const LIMIT = 30;

const Loading = props => <LinearProgress />;

const displayLoadingState = branch(
  props => props.data.loading,
  renderComponent(Loading)
);

const mapDataProps = mapProps(({ match, data, ...otherProps }) => {
  return {
    calculationId: match.params.calculationId,
    geometry: data.geometry,
    energies: data.geometry.energies,
    forces: data.geometry.forces,
    geometryOptimizations: data.geometry.optimizations,
    harmonicSpectra: data.geometry.harmonicSpectra,
    refetch: data.refetch,
    ...otherProps,
  };
});

const Geometry = compose(withData, displayLoadingState, mapDataProps)(
  GeometryPure
);

export { Geometry };
export default Geometry;
