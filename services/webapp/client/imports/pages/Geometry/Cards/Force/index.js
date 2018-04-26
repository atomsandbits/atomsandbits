import React from 'react';
import { sprintf } from 'sprintf-js';
import { compose, branch, renderComponent, renderNothing } from 'recompose';

import {
  CardProperty,
  CardPropertyLabel,
  CardPropertyRow,
  CardTitle,
  ErrorIcon,
  Expandable,
  LoadIndicator,
} from '../../styles';

const countDecimals = number => {
  if (Math.floor(number.valueOf()) === number.valueOf()) return 0;
  if (number.toString().indexOf('e-') !== -1) {
    return parseInt(number.toString().split('e-')[1], 10);
  }
  return number.toString().split('.')[1].length || 0;
};

const prettyPrint = matrix => {
  const prettyStringArray = [];
  const decimals = 8;
  const prespacing = 5; // allows up to 99999 atoms
  const positionSpacing = 2; // spacing after position
  const spacing = 2; // spacing between values

  let xLargestInt = 0;
  let yLargestInt = 0;
  let zLargestInt = 0;

  const impreciseMatrix = matrix.map(matrixRow =>
    matrixRow.map(item => item.toFixed(decimals))
  );
  impreciseMatrix.forEach(atomForce => {
    const xIntCount = Number(atomForce[0])
      .toFixed()
      .toString().length;
    const yIntCount = Number(atomForce[1])
      .toFixed()
      .toString().length;
    const zIntCount = Number(atomForce[2])
      .toFixed()
      .toString().length;
    xLargestInt = xLargestInt < xIntCount ? xIntCount : xLargestInt;

    yLargestInt = yLargestInt < yIntCount ? yIntCount : yLargestInt;

    zLargestInt = zLargestInt < zIntCount ? zIntCount : zLargestInt;
  });
  impreciseMatrix.forEach((atomForce, index) => {
    const position = index + 1;
    prettyStringArray.push(
      sprintf(
        `%${prespacing}f %${decimals +
          xLargestInt +
          positionSpacing}.${decimals}f %${decimals +
          yLargestInt +
          spacing}.${decimals}f %${decimals +
          zLargestInt +
          spacing}.${decimals}f  `,
        position,
        atomForce[0],
        atomForce[1],
        atomForce[2]
      )
    );
  });
  return prettyStringArray.join('\n');
};

const ForceRowLoading = ({ label }) => (
  <CardPropertyRow key={`${label}`}>
    <CardPropertyLabel>{label}</CardPropertyLabel>
    <CardProperty>
      <LoadIndicator size={20} thickness={5} />
    </CardProperty>
  </CardPropertyRow>
);

const ForceRowError = ({ label }) => (
  <CardPropertyRow key={`${label}`}>
    <CardPropertyLabel>{label}</CardPropertyLabel>
    <CardProperty>
      <ErrorIcon />
    </CardProperty>
  </CardPropertyRow>
);

const ForceRowPure = ({ force, label }) => (
  <CardPropertyRow key={`${label}-${force}`}>
    <CardPropertyLabel>{label}</CardPropertyLabel>
    <CardProperty autoselect small>{prettyPrint(force)}</CardProperty>
  </CardPropertyRow>
);

const ForceRow = compose(
  branch(({ error }) => Boolean(error), renderComponent(ForceRowError)),
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
