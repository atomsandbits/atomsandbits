import React from 'react';
import { compose, branch, renderComponent, renderNothing } from 'recompose';

import Chart from './Chart';

import {
  CardProperty,
  CardPropertyLabel,
  CardPropertyRow,
  CardTitle,
  ErrorIcon,
  LoadIndicator,
  Expandable,
} from '../../styles';

const HarmonicSpectrumRowLoading = ({ label }) => (
  <CardPropertyRow key={`${label}`}>
    <CardPropertyLabel>{label}</CardPropertyLabel>
    <CardProperty>
      <LoadIndicator size={20} thickness={5} />
    </CardProperty>
  </CardPropertyRow>
);

const HarmonicSpectrumRowError = ({ label }) => (
  <CardPropertyRow key={`${label}`}>
    <CardPropertyLabel>{label}</CardPropertyLabel>
    <CardProperty>
      <ErrorIcon />
    </CardProperty>
  </CardPropertyRow>
);

const HarmonicSpectrumRowPure = ({ frequencies, intensities, label }) => (
  <CardPropertyRow key={`${label}-${frequencies}`}>
    <CardPropertyLabel>{label}</CardPropertyLabel>
    <CardProperty>
      <Chart frequencies={frequencies} intensities={intensities} />
    </CardProperty>
  </CardPropertyRow>
);

const HarmonicSpectrumRow = compose(
  branch(
    ({ error }) => Boolean(error),
    renderComponent(HarmonicSpectrumRowError)
  ),
  branch(({ running }) => running, renderComponent(HarmonicSpectrumRowLoading))
)(HarmonicSpectrumRowPure);

const HarmonicSpectrumCardPure = ({ harmonicSpectra }) => (
  <Expandable
    summary={[
      <CardTitle key="main-card-title">Harmonic Spectra</CardTitle>,
      <HarmonicSpectrumRow key="main-card-row" {...harmonicSpectra[0]} />,
    ]}
    details={harmonicSpectra
      .slice(1)
      .map(harmonicDocument => (
        <HarmonicSpectrumRow
          key={`${harmonicDocument.label}-row`}
          {...harmonicDocument}
        />
      ))}
  />
);

const SingleHarmonicSpectrumCardPure = ({ harmonicSpectra }) => (
  <Expandable
    expandable={false}
    summary={[
      <CardTitle key="main-card-title">Harmonic Spectra</CardTitle>,
      <HarmonicSpectrumRow key="main-card-row" {...harmonicSpectra[0]} />,
    ]}
    details=""
  />
);

const noEnergiesBranch = branch(
  ({ harmonicSpectra }) => !harmonicSpectra || harmonicSpectra.length === 0,
  renderNothing
);

const singleHarmonicSpectrumBranch = branch(
  ({ harmonicSpectra }) => harmonicSpectra && harmonicSpectra.length === 1,
  renderComponent(SingleHarmonicSpectrumCardPure)
);

const HarmonicSpectrumCard = compose(
  noEnergiesBranch,
  singleHarmonicSpectrumBranch
)(HarmonicSpectrumCardPure);

export { HarmonicSpectrumCard };
export default HarmonicSpectrumCard;
