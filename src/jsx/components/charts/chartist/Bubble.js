import React from 'react';
import ReactApexChart from 'react-apexcharts';

function generateData(baseval, count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
    var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

    series.push([x, y, z]);
    baseval += 86400000;
    i++;
  }
  return series;
}

class Bubble extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      render: false,
      series: [
        {
          name: 'Bubble1',
          data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60,
          }),
        },
        {
          name: 'Bubble2',
          data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60,
          }),
        },
        {
          name: 'Bubble3',
          data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60,
          }),
        },
        {
          name: 'Bubble4',
          data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60,
          }),
        },
      ],
      options: {
        chart: {
          height: 350,
          type: 'bubble',
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          colors: ['#2953e8', '#00e396', '#feb019', '#ff4560'],
          opacity: 0.8,
        },
        title: {
          text: 'Simple Bubble Chart',
        },
        xaxis: {
          tickAmount: 12,
          type: 'category',
        },
        yaxis: {
          max: 70,
        },
      },
    };
  }

  componentDidMount() {
    setTimeout(
      function () {
        //Start the timer
        this.setState({ render: true }); //After 1 second, set render to true
      }.bind(this),
      1000,
    );
  }

  render() {
    let renderContainer = false;
    if (this.state.render) {
      renderContainer = (
        <div id='chart'>
          <ReactApexChart options={this.state.options} series={this.state.series} type='bubble' />
        </div>
      );
    }

    return renderContainer; //Render the dom elements, or, when this.state == false, nothing.
  }
}

export default Bubble;
