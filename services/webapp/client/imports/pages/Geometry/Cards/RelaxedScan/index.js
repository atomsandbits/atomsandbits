import React from 'react';
import {
  compose,
  branch,
  renderComponent,
  renderNothing,
  pure,
  mapProps,
} from 'recompose';

import Chart from './Chart';
import { GeometryOptimizationRenderer } from '../GeometryOptimization/Renderer';
import {
  CardProperty,
  CardPropertyLabel,
  CardPropertyRow,
  CardTitle,
  ErrorIcon,
  Column,
  Expandable,
  LoadIndicator,
} from '../../styles';

const RelaxedScanRowLoading = ({ label }) => (
  <CardPropertyRow key={`${label}`}>
    <CardPropertyLabel>{label}</CardPropertyLabel>
    <CardProperty>
      <LoadIndicator size={20} thickness={5} />
    </CardProperty>
  </CardPropertyRow>
);

const RelaxedScanRowError = ({ label }) => (
  <CardPropertyRow key={`${label}`}>
    <CardPropertyLabel>{label}</CardPropertyLabel>
    <CardProperty>
      <ErrorIcon />
    </CardProperty>
  </CardPropertyRow>
);

const RelaxedScanRowPure = ({
  geometries,
  energies,
  distances,
  label,
  running,
}) => (
  <CardPropertyRow key={`${label}`}>
    <CardPropertyLabel>{label}</CardPropertyLabel>
    <CardProperty small tall>
      <GeometryOptimizationRenderer
        autoplay={true}
        key="temp-key"
        geometries={geometries}
        energies={energies}
      />
      {distances ? (
        <Chart
          xs={distances}
          ys={energies.map(energy => (energy - energies[0]) * 27.2114)}
        />
      ) : null}
    </CardProperty>
    {running ? (
      <LoadIndicator
        style={{ position: 'absolute', top: 20, right: 20 }}
        size={20}
        thickness={5}
      />
    ) : null}
  </CardPropertyRow>
);

const RelaxedScanRow = compose(
  pure,
  branch(({ error }) => Boolean(error), renderComponent(RelaxedScanRowError)),
  branch(
    ({ running, geometries }) =>
      running && (!geometries || geometries.length === 0),
    renderComponent(RelaxedScanRowLoading)
  )
)(RelaxedScanRowPure);

const RelaxedScanCardPure = ({ relaxedScans, title }) => (
  <Expandable
    summary={[
      <CardTitle key="main-card-title">
        {title ? title : 'Relaxed Scan'}
      </CardTitle>,
      <RelaxedScanRow key="main-card-optimization" {...relaxedScans[0]} />,
    ]}
    details={relaxedScans
      .slice(1)
      .map(geometryOptimization => (
        <RelaxedScanRow
          key={`${geometryOptimization.label}-row`}
          {...geometryOptimization}
        />
      ))}
  />
);

const SingleRelaxedScanCard = ({ relaxedScans, title }) => (
  <Expandable
    expandable={false}
    summary={[
      <CardTitle key="main-card-title">
        {title ? title : 'Relaxed Scan'}
      </CardTitle>,
      <RelaxedScanRow key="main-card-optimization" {...relaxedScans[0]} />,
    ]}
    details=""
  >
    {console.log(relaxedScans[0])}
  </Expandable>
);

const noOptimizationsBranch = branch(
  ({ relaxedScans }) => !relaxedScans || relaxedScans.length === 0,
  renderNothing
);

// Create branch for loading
// const noOptimizationsBranch = branch(
//   ({ relaxedScans }) =>
//     !relaxedScans || relaxedScans.length === 0,
//   renderNothing
// );

const singleOptimizationBranch = branch(
  ({ relaxedScans }) => relaxedScans && relaxedScans.length === 1,
  renderComponent(SingleRelaxedScanCard)
);

const RelaxedScanCard = compose(
  noOptimizationsBranch,
  singleOptimizationBranch
)(RelaxedScanCardPure);

export { RelaxedScanCard };
export default RelaxedScanCard;
