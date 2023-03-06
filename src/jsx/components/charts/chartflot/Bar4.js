import React, { Component } from 'react';

import { Bar } from 'react-chartjs-2';

const data = {
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  datasets: [
    {
      label: 'My First dataset',
      data: [65, 59, 40, 35, 30, 25, 25, 30, 35, 40, 59, 65],
      borderColor: '#2953E8',
      backgroundColor: '#2953E8',
    },
  ],
};

const options = {
  plugins: {
    tooltips: {
      enabled: true,
    },
    legend: {
      display: false,
      labels: {
        usePointStyle: false,
      },
    },
  },
  maintainAspectRatio: false,

  scales: {
    yAxes: [
      {
        display: false,
        ticks: {
          beginAtZero: true,
          min: 0,
        },
      },
    ],
    xAxes: [{ display: false, barPercentage: 0.15 }],
  },
};

class BarChart4 extends Component {
  render() {
    return (
      <>
        <Bar data={data} width={433} height={251} options={options} />
      </>
    );
  }
}

export default BarChart4;
