import React, { Component } from 'react';

import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      data: [22, 40, 60, 81, 56, 32, 25],
      borderColor: 'rgba(52, 57, 87, 1)',
      backgroundColor: 'rgba(52, 57, 87, 1)',
    },
    {
      label: 'My Second dataset',
      data: [28, 48, 80, 70, 40, 27, 22],
      borderColor: 'rgba(88, 115, 254,1)',
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
        ticks: {
          beginAtZero: false,
          min: 0,
        },
        gridLines: {
          display: true,
          drawBorder: false,
        },
      },
    ],
    xAxes: [
      {
        barPercentage: 0.7,
        gridLines: {
          display: true,
          drawBorder: true,
        },
      },
    ],
  },
};

class BarChart extends Component {
  render() {
    return (
      <>
        <Bar data={data} width={433} height={251} options={options} />
      </>
    );
  }
}

export default BarChart;
