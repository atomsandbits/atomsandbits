/* eslint-disable */
import React from 'react';
import { compose, withProps } from 'recompose';
import { defaults, Line as LineChart } from 'react-chartjs-2';

import { colors } from '/client/imports/theme';
import { generateData } from './generate-data';

defaults.global.defaultFontFamily = 'Space Mono';
const chartOptions = {
  title: {
    display: false,
  },
  legend: {
    display: false,
  },
  elements: {
    line: {
      fill: false,
      // borderWidth: 0,
      // tension: 0.8,
      // capBezierPoints: false,
      // borderColor: colors.primary,
    },
    point: {
      radius: 2,
      backgroundColor: colors.primary,
      // backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'rgba(0,0,0,0)',
    },
  },
  scales: {
    yAxes: [
      {
        scaleLabel: {
          labelString: 'intensity',
          display: true,
        },
      },
    ],
    xAxes: [
      {
        type: 'linear',
        position: 'bottom',
        ticks: {
          min: 0,
          max: 4000,
        },
        scaleLabel: {
          labelString: 'frequency (cm-1)',
          display: true,
        },
      },
    ],
  },
};

const Chart = ({ frequencies, intensities }) => (
  <LineChart
    data={{
      datasets: [
        {
          data: generateData({ frequencies, intensities }),
        },
      ],
    }}
    width={500}
    height={300}
    options={chartOptions}
  />
);

export { Chart };
export default Chart;
