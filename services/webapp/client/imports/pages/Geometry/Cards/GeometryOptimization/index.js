import React from 'react';
import {
  compose,
  branch,
  renderComponent,
  renderNothing,
  pure,
  mapProps,
} from 'recompose';

import { GeometryOptimizationRenderer } from './Renderer';
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

const GeometryOptimizationRowLoading = ({ label }) => (
  <CardPropertyRow key={`${label}`}>
    <CardPropertyLabel>{label}</CardPropertyLabel>
    <CardProperty>
      <LoadIndicator size={20} thickness={5} />
    </CardProperty>
  </CardPropertyRow>
);

const GeometryOptimizationRowError = ({ label }) => (
  <CardPropertyRow key={`${label}`}>
    <CardPropertyLabel>{label}</CardPropertyLabel>
    <CardProperty>
      <ErrorIcon />
    </CardProperty>
  </CardPropertyRow>
);

const GeometryOptimizationRowPure = ({
  geometries,
  energies,
  label,
  running,
}) => (
  <CardPropertyRow key={`${label}`}>
    <CardPropertyLabel>{label}</CardPropertyLabel>
    <CardProperty small tall>
      <GeometryOptimizationRenderer
        key="temp-key"
        geometries={geometries}
        energies={energies}
      />
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

const GeometryOptimizationRow = compose(
  pure,
  branch(
    ({ error }) => Boolean(error),
    renderComponent(GeometryOptimizationRowError)
  ),
  branch(
    ({ running, geometries }) =>
      running && (!geometries || geometries.length === 0),
    renderComponent(GeometryOptimizationRowLoading)
  )
)(GeometryOptimizationRowPure);

const GeometryOptimizationCardPure = ({ geometryOptimizations, title }) => (
  <Expandable
    summary={[
      <CardTitle key="main-card-title">
        {title ? title : 'Geometry Optimization'}
      </CardTitle>,
      <GeometryOptimizationRow
        key="main-card-optimization"
        {...geometryOptimizations[0]}
      />,
    ]}
    details={geometryOptimizations
      .slice(1)
      .map((geometryOptimization) => (
        <GeometryOptimizationRow
          key={`${geometryOptimization.label}-row`}
          {...geometryOptimization}
        />
      ))}
  />
);

const SingleGeometryOptimizationCard = ({ geometryOptimizations, title }) => (
  <Expandable
    expandable={false}
    summary={[
      <CardTitle key="main-card-title">
        {title ? title : 'Geometry Optimization'}
      </CardTitle>,
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
