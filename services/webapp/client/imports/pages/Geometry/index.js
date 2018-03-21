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
import { FreeEnergyCard } from './Cards/FreeEnergy';
import { GeometryOptimizationCard } from './Cards/GeometryOptimization';
import { ConformerSearchCard } from './Cards/ConformerSearch';
import { HarmonicSpectrumCard } from './Cards/HarmonicSpectrum';
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
  freeEnergies,
  geometryOptimizations,
  conformerSearches,
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
              <FreeEnergyCard freeEnergies={freeEnergies} />
              <GeometryOptimizationCard
                geometryOptimizations={geometryOptimizations}
              />
              <HarmonicSpectrumCard harmonicSpectra={harmonicSpectra} />
              <ConformerSearchCard conformerSearches={conformerSearches} />
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
    freeEnergies: data.geometry.freeEnergies,
    geometryOptimizations: data.geometry.optimizations,
    conformerSearches: data.geometry.conformerSearches,
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
