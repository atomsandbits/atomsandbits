import React from 'react';
import { compose, branch, renderComponent, renderNothing } from 'recompose';

import Expandable from '/client/imports/components/Expandable';

import {
  CardProperty,
  CardPropertyLabel,
  CardPropertyRow,
  CardTitle,
  LoadIndicator,
} from '../../styles';

const matprint = mat => {
  let shape = [mat.length, mat[0].length];
  function col(mat, i) {
    return mat.map(row => row[i]);
  }
  let colMaxes = [];
  for (let i = 0; i < shape[1]; i++) {
    colMaxes.push(
      Math.max.apply(null, col(mat, i).map(n => n.toString().length))
    );
  }

  let value = mat
    .map(row => {
      return row.map((val, j) => {
        return (
          new Array(colMaxes[j] - val.toString().length + 1).join(' ') +
          val.toString() +
          '  '
        );
      });
    })
    .join('\n');
  return value;
};

const ForceRowLoading = ({ label }) => (
  <CardPropertyRow key={`${label}`}>
    <CardPropertyLabel>{label}</CardPropertyLabel>
    <CardProperty>
      <LoadIndicator size={20} thickness={5} />
    </CardProperty>
  </CardPropertyRow>
);

const ForceRowPure = ({ force, label }) => (
  <CardPropertyRow key={`${label}-${force}`}>
    <CardPropertyLabel>{label}</CardPropertyLabel>
    <CardProperty small>{matprint(force)}</CardProperty>
  </CardPropertyRow>
);

const ForceRow = compose(
  branch(({ running }) => running, renderComponent(ForceRowLoading))
)(ForceRowPure);

const ForceCardPure = ({ forces }) => (
  <Expandable
    summary={[
      <CardTitle key="main-card-title">Force</CardTitle>,
      <ForceRow key="main-card-force" {...forces[0]} />,
    ]}
    details={forces
      .slice(1)
      .map(forceDocument => (
        <ForceRow key={`${forceDocument.label}-row`} {...forceDocument} />
      ))}
  />
);

const SingleForceCardPure = ({ forces }) => (
  <Expandable
    expandable={false}
    summary={[
      <CardTitle key="main-card-title">Force</CardTitle>,
      <ForceRow key="main-card-force" {...forces[0]} />,
    ]}
    details=""
  />
);

const noForcesBranch = branch(
  ({ forces }) => !forces || forces.length === 0,
  renderNothing
);

const singleForceBranch = branch(
  ({ forces }) => forces && forces.length === 1,
  renderComponent(SingleForceCardPure)
);

const ForceCard = compose(noForcesBranch, singleForceBranch)(ForceCardPure);

export { ForceCard };
export default ForceCard;
