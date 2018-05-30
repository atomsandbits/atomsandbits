/* eslint-disable */
import React from 'react';
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

const FreeEnergyRowLoading = ({ label }) => (
  <CardPropertyRow key={`${label}`}>
    <CardPropertyLabel>{label}</CardPropertyLabel>
    <LoadIndicator size={20} thickness={5} />
  </CardPropertyRow>
);

const FreeEnergyRowError = ({ label }) => (
  <CardPropertyRow key={`${label}`}>
    <CardPropertyLabel>{label}</CardPropertyLabel>
    <CardProperty>
      <ErrorIcon />
    </CardProperty>
  </CardPropertyRow>
);

const FreeEnergyRowPure = ({ freeEnergy, label }) => (
  <CardPropertyRow key={`${label}-${freeEnergy}`}>
    <CardPropertyLabel>{label}</CardPropertyLabel>
    <CardProperty autoselect>{freeEnergy} Ha</CardProperty>
  </CardPropertyRow>
);

const FreeEnergyRow = compose(
  branch(({ error }) => Boolean(error), renderComponent(FreeEnergyRowError)),
  branch(({ running }) => running, renderComponent(FreeEnergyRowLoading))
)(FreeEnergyRowPure);

const FreeEnergyCardPure = ({ freeEnergies }) => (
  <Expandable
    summary={[
      <CardTitle key="main-card-title">Free Energy</CardTitle>,
      <FreeEnergyRow key="main-card-row" {...freeEnergies[0]} />,
    ]}
    details={freeEnergies
      .slice(1)
      .map((FreeEnergyDocument) => (
        <FreeEnergyRow
          key={`${FreeEnergyDocument.label}-row`}
          {...FreeEnergyDocument}
        />
      ))}
  />
);

const SingleFreeEnergyCardPure = ({ freeEnergies }) => (
  <Expandable
    expandable={false}
    summary={[
      <CardTitle key="main-card-title">Free Energy</CardTitle>,
      <FreeEnergyRow key="main-card-row" {...freeEnergies[0]} />,
    ]}
    details=""
  />
);

const noFreeEnergiesBranch = branch(
  ({ freeEnergies }) => !freeEnergies || freeEnergies.length === 0,
  renderNothing
);

const singleFreeEnergyBranch = branch(
  ({ freeEnergies }) => freeEnergies && freeEnergies.length === 1,
  renderComponent(SingleFreeEnergyCardPure)
);

const FreeEnergyCard = compose(noFreeEnergiesBranch, singleFreeEnergyBranch)(
  FreeEnergyCardPure
);

export { FreeEnergyCard };
export default FreeEnergyCard;
