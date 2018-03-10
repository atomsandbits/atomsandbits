import React from 'react';
import { compose, branch, renderComponent, renderNothing } from 'recompose';

import Expandable from '/client/imports/components/Expandable';

import {
  CardProperty,
  CardPropertyLabel,
  CardPropertyRow,
  CardTitle,
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

const ForceCardPure = ({ forces }) => (
  <Expandable
    summary={[
      <CardTitle key="main-card-title">Force</CardTitle>,
      <CardPropertyLabel key="main-card-label">
        {forces[0].label}
      </CardPropertyLabel>,
      <CardProperty small key="main-card-property">
        {forces[0].force}
      </CardProperty>,
    ]}
    details={forces.slice(0, 1).map(({ label, force }) => (
      <CardPropertyRow key={`${label}-${force}`}>
        <CardPropertyLabel>{label}</CardPropertyLabel>
        <CardProperty small>{force}</CardProperty>
      </CardPropertyRow>
    ))}
  />
);

const SingleForceCardPure = ({ forces }) => (
  <Expandable
    expandable={false}
    summary={[
      <CardTitle key="main-card-title">Force</CardTitle>,
      <CardPropertyLabel key="main-card-label">
        {forces[0].label}
      </CardPropertyLabel>,
      <CardProperty small key="main-card-property">
        {matprint(forces[0].force)}
      </CardProperty>,
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
