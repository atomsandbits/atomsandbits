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

const EnergyRowLoading = ({ label }) => (
  <CardPropertyRow key={`${label}`}>
    <CardPropertyLabel>{label}</CardPropertyLabel>
    <CardProperty>
      <LoadIndicator size={20} thickness={5} />
    </CardProperty>
  </CardPropertyRow>
);

const EnergyRowPure = ({ energy, label }) => (
  <CardPropertyRow key={`${label}-${energy}`}>
    <CardPropertyLabel>{label}</CardPropertyLabel>
    <CardProperty>{energy}</CardProperty>
  </CardPropertyRow>
);

const EnergyRow = compose(
  branch(({ running }) => running, renderComponent(EnergyRowLoading))
)(EnergyRowPure);

const EnergyCardPure = ({ energies }) => (
  <Expandable
    summary={[
      <CardTitle key="main-card-title">Energy</CardTitle>,
      <EnergyRow key="main-card-row" {...energies[0]} />,
    ]}
    details={energies
      .slice(1)
      .map(energyDocument => (
        <EnergyRow key={`${energyDocument.label}-row`} {...energyDocument} />
      ))}
  />
);

const SingleEnergyCardPure = ({ energies }) => (
  <Expandable
    expandable={false}
    summary={[
      <CardTitle key="main-card-title">Energy</CardTitle>,
      <EnergyRow key="main-card-row" {...energies[0]} />,
    ]}
    details=""
  />
);

const noEnergiesBranch = branch(
  ({ energies }) => !energies || energies.length === 0,
  renderNothing
);

const singleEnergyBranch = branch(
  ({ energies }) => energies && energies.length === 1,
  renderComponent(SingleEnergyCardPure)
);

const EnergyCard = compose(noEnergiesBranch, singleEnergyBranch)(
  EnergyCardPure
);

export { EnergyCard };
export default EnergyCard;