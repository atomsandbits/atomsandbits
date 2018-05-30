/* eslint-disable */
import React from 'react';
// import { compose, withProps } from 'recompose';
import { defaults, Line as LineChart } from 'react-chartjs-2';

import { colors } from '/both/imports/theme';

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
      radius: 4,
      backgroundColor: colors.primary,
      // backgroundColor: 'rgba(0,0,0,0)',
      // borderColor: 'rgba(0,0,0,0)',
    },
  },
  scales: {
    yAxes: [
      {
        scaleLabel: {
          labelString: 'energy (eV)',
          display: true,
        },
      },
    ],
    xAxes: [
      {
        type: 'linear',
        position: 'bottom',
        scaleLabel: {
          labelString: 'distance (Å)',
          display: true,
        },
      },
    ],
  },
};

const Chart = ({ xs, ys }) => (
  <LineChart
    data={{
      datasets: [
        {
          data: xs.map((x, index) => ({ x: x, y: ys[index] })),
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
