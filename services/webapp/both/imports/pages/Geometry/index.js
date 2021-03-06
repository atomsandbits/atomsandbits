import React from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  branch,
  renderComponent,
  mapProps,
  withHandlers,
  withState,
} from 'recompose';
import { Helmet } from 'react-helmet';
import LinearProgress from '@material-ui/core/LinearProgress';
import Checkbox from '@material-ui/core/Checkbox';

// import { logger } from '/both/imports/logger';

import AppLayout from '/both/imports/components/AppLayout';
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
import { withData } from './withData';
import {
  AtomicCoords,
  AtomicCoordsContainer,
  // CardTitle,
  CardTitleWithOptions,
  ColumnContent,
  GeometryCalculationColumn,
  GeometryInformationColumn,
  GeometryPageContainer,
  GeometryPageContent,
  GeometryOptions,
  SpeckRenderer,
} from './styles';

// const LIMIT = 30;

const Loading = (props) => (
  <AppLayout
    mobileOnlyToolbar
    alwaysRaised
    title="Geometry"
    appContent={
      <GeometryPageContainer>
        <Helmet>
          <title>geometry | atoms+bits</title>
          <meta
            name="description"
            content="quantum simulations of a molecule"
          />
        </Helmet>
        <LinearProgress />
      </GeometryPageContainer>
    }
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

const enhance = compose(
  withData,
  displayLoadingState,
  withState('showIndexes', 'setShowIndexes', true),
  withHandlers({
    setShowIndexes: ({ setShowIndexes }) => (event) => {
      setShowIndexes(event.target.checked);
    },
  }),
  mapDataProps
);

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
  showIndexes,
  setShowIndexes,
}) => (
  <AppLayout
    mobileOnlyToolbar
    alwaysRaised
    title="Geometry"
    appContent={
      <GeometryPageContainer>
        <Helmet>
          <title>
            {geometry.tags.length > 0
              ? geometry.tags.slice(0, 3).join(' • ') + ' | '
              : ''}{' '}
            {geometry.molecularFormula} | atoms+bits
          </title>
          <meta
            name="description"
            content={`quantum simulations of ${
              geometry.tags.length > 0
                ? geometry.tags[0]
                : `a ${geometry.molecularFormula} geometry`
            }`}
          />
        </Helmet>
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
                placeholder={`/geometry/${geometry.id}/image/medium`}
              />
              <Tags tags={geometry.tags} refetch={refetch} />
              <AtomicCoordsContainer>
                <CardTitleWithOptions>
                  <div style={{ flexShrink: 0, flexGrow: 0 }}>
                    Atomic Coordinates
                  </div>
                  <GeometryOptions>
                    <div>
                      indexes
                      <Checkbox
                        checked={showIndexes}
                        onChange={setShowIndexes}
                        color="secondary"
                      />
                    </div>
                  </GeometryOptions>
                </CardTitleWithOptions>
                <AtomicCoords>
                  {new Molecule({ xyz: geometry.atomicCoords })
                    .prettify({ positions: showIndexes })
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
GeometryPure.propTypes = {
  geometry: PropTypes.object,
  energies: PropTypes.arrayOf(PropTypes.object),
  forces: PropTypes.arrayOf(PropTypes.object),
  freeEnergies: PropTypes.arrayOf(PropTypes.object),
  geometryOptimizations: PropTypes.arrayOf(PropTypes.object),
  conformerSearches: PropTypes.arrayOf(PropTypes.object),
  harmonicSpectra: PropTypes.arrayOf(PropTypes.object),
  relaxedScans: PropTypes.arrayOf(PropTypes.object),
  refetch: PropTypes.func,
  showIndexes: PropTypes.bool.isRequired,
  setShowIndexes: PropTypes.func.isRequired,
};
const Geometry = enhance(GeometryPure);

export { Geometry };
export default Geometry;
