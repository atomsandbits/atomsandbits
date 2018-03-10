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
} from '../../styles';

const GeometryOptimizationCardPure = ({ geometryOptimizations }) => (
  <Expandable
    summary={[
      <CardTitle key="main-card-title">GeometryOptimization</CardTitle>,
      <CardPropertyLabel key="main-card-label">
        {geometryOptimizations[0].label}
      </CardPropertyLabel>,
      <CardProperty key="main-card-property">
        {geometryOptimizations[0].energy}
      </CardProperty>,
    ]}
    details={geometryOptimizations.slice(0, 1).map(({ label, energy }) => (
      <CardPropertyRow key={`${label}-${energy}`}>
        <CardPropertyLabel>{label}</CardPropertyLabel>
        <CardProperty>{energy}</CardProperty>
      </CardPropertyRow>
    ))}
  />
);

const SingleGeometryOptimizationCard = ({ geometryOptimizations }) => (
  <Expandable
    expandable={false}
    summary={[
      <CardTitle key="main-card-title">GeometryOptimization</CardTitle>,
      <GeometryOptimizationRenderer
        key="temp-key"
        geometries={geometryOptimizations[0].geometries}
        energies={geometryOptimizations[0].energies}
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
