import React from 'react';
import PropTypes from 'prop-types';
import { compose, branch, renderComponent, mapProps } from 'recompose';
import { withData } from './withData';

import { LinearProgress } from 'material-ui/Progress';

import { logger } from '/both/imports/logger';

import AppLayout from '/client/imports/components/AppLayout';
import { EnergyCard } from './Cards/Energy';
import { ForceCard } from './Cards/Force';
import { FreeEnergyCard } from './Cards/FreeEnergy';
import { GeometryOptimizationCard } from './Cards/GeometryOptimization';
import { ConformerSearchCard } from './Cards/ConformerSearch';
import { HarmonicSpectrumCard } from './Cards/HarmonicSpectrum';
import { RelaxedScanCard } from './Cards/RelaxedScan';
import { Tags } from './Tags';

import { Molecule } from '/both/imports/tools/Molecule';
import xyzTools from '/both/imports/tools/xyz';
import {
  AtomicCoords,
  AtomicCoordsContainer,
  CardTitle,
  ColumnContent,
  GeometryCalculationColumn,
  GeometryInformationColumn,
  GeometryPageContainer,
  GeometryPageContent,
  SpeckRenderer,
} from './styles';

const LIMIT = 30;

const Loading = (props) => (
  <AppLayout
    mobileOnlyToolbar
    alwaysRaised
    title="Geometry"
    appContent={<LinearProgress />}
  />
);

const displayLoadingState = branch(
  (props) => props.data.loading && !props.data.geometry,
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
    relaxedScans: data.geometry.relaxedScans,
    refetch: data.refetch,
    ...otherProps,
  };
});

const enhance = compose(withData, displayLoadingState, mapDataProps);

const GeometryPure = ({
  geometry,
  energies,
  forces,
  freeEnergies,
  geometryOptimizations,
  conformerSearches,
  harmonicSpectra,
  relaxedScans,
  refetch,
}) => (
  <AppLayout
    mobileOnlyToolbar
    alwaysRaised
    title="Geometry"
    appContent={
      <GeometryPageContainer>
        {logger.info('Geometry', geometry)}
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
              <RelaxedScanCard relaxedScans={relaxedScans} />
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

const Geometry = enhance(GeometryPure);

export { Geometry };
export default Geometry;
