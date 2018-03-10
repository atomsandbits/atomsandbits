import React from 'react';
import { compose, branch, renderComponent, renderNothing } from 'recompose';

import Expandable from '/client/imports/components/Expandable';

import {
  CardProperty,
  CardPropertyLabel,
  CardPropertyRow,
  CardTitle,
} from '../../styles';

const EnergyCardPure = ({ energies }) => (
  <Expandable
    summary={[
      <CardTitle key="main-card-title">Energy</CardTitle>,
      <CardPropertyLabel key="main-card-label">
        {energies[0].label}
      </CardPropertyLabel>,
      <CardProperty key="main-card-property">
        {energies[0].energy}
      </CardProperty>,
    ]}
    details={energies.slice(0, 1).map(({ label, energy }) => (
      <CardPropertyRow key={`${label}-${energy}`}>
        <CardPropertyLabel>{label}</CardPropertyLabel>
        <CardProperty>{energy}</CardProperty>
      </CardPropertyRow>
    ))}
  />
);

const SingleEnergyCardPure = ({ energies }) => (
  <Expandable
    expandable={false}
    summary={[
      <CardTitle key="main-card-title">Energy</CardTitle>,
      <CardPropertyLabel key="main-card-label">
        {energies[0].label}
      </CardPropertyLabel>,
      <CardProperty key="main-card-property">
        {energies[0].energy}
      </CardProperty>,
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
