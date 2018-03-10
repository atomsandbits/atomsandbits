import React from 'react';
import {
  compose,
  branch,
  renderComponent,
  renderNothing,
  mapProps,
} from 'recompose';

import Expandable from '/client/imports/components/Expandable';

import { GeometryOptimizationRenderer } from './Renderer';
import {
  CardProperty,
  CardPropertyLabel,
  CardPropertyRow,
  CardTitle,
  Column,
  LoadIndicator,
} from '../../styles';

const GeometryOptimizationRowLoading = ({ label }) => (
  <CardPropertyRow key={`${label}`}>
    <CardPropertyLabel>{label}</CardPropertyLabel>
    <CardProperty>
      <LoadIndicator size={20} thickness={5} />
    </CardProperty>
  </CardPropertyRow>
);

const GeometryOptimizationRowPure = ({ geometries, energies, label }) => (
  <CardPropertyRow key={`${label}-${energies}`}>
    <CardPropertyLabel>{label}</CardPropertyLabel>
    <CardProperty small>
      <GeometryOptimizationRenderer
        key="temp-key"
        geometries={geometries}
        energies={energies}
      />
    </CardProperty>
  </CardPropertyRow>
);

const GeometryOptimizationRow = compose(
  branch(
    ({ running }) => running,
    renderComponent(GeometryOptimizationRowLoading)
  )
)(GeometryOptimizationRowPure);

const GeometryOptimizationCardPure = ({ geometryOptimizations }) => (
  <Expandable
    summary={[
      <CardTitle key="main-card-title">GeometryOptimization</CardTitle>,
      <GeometryOptimizationRow
        key="main-card-optimization"
        {...geometryOptimizations[0]}
      />,
    ]}
    details={geometryOptimizations
      .slice(0, 1)
      .map(geometryOptimization => (
        <GeometryOptimizationRow
          key={`${geometryOptimization.label}-row`}
          {...geometryOptimization}
        />
      ))}
  />
);

const SingleGeometryOptimizationCard = ({ geometryOptimizations }) => (
  <Expandable
    expandable={false}
    summary={[
      <CardTitle key="main-card-title">GeometryOptimization</CardTitle>,
      <GeometryOptimizationRow
        key="main-card-optimization"
        {...geometryOptimizations[0]}
      />,
    ]}
    details=""
  />
);

const noOptimizationsBranch = branch(
  ({ geometryOptimizations }) =>
    !geometryOptimizations || geometryOptimizations.length === 0,
  renderNothing
);

// Create branch for loading
// const noOptimizationsBranch = branch(
//   ({ geometryOptimizations }) =>
//     !geometryOptimizations || geometryOptimizations.length === 0,
//   renderNothing
// );

const singleOptimizationBranch = branch(
  ({ geometryOptimizations }) =>
    geometryOptimizations && geometryOptimizations.length === 1,
  renderComponent(SingleGeometryOptimizationCard)
);

const GeometryOptimizationCard = compose(
  noOptimizationsBranch,
  singleOptimizationBranch
)(GeometryOptimizationCardPure);

export { GeometryOptimizationCard };
export default GeometryOptimizationCard;
