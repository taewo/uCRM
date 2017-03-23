import React, { Component } from 'react';
import { Radar, Line, Bar, Doughnut, HorizontalBar } from 'react-chartjs-2';
import { cloneDeep } from 'lodash';

class ReportChart extends Component {

  constructor(props) {
    super(props);
    this.mixedOption = {
      responsive: true,
      tooltips: {
        mode: 'label',
      },
      elements: {
        line: {
          fill: false,
        },
      },
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              display: false,
            },
            labels: {
              show: true,
            },
          },
        ],
        yAxes: [
          {
            type: 'linear',
            display: true,
            position: 'left',
            id: 'y-axis-1',
            gridLines: {
              display: false,
            },
            labels: {
              show: true,
            },
          },
          {
            type: 'linear',
            display: true,
            position: 'right',
            id: 'y-axis-2',
            gridLines: {
              display: false,
            },
            labels: {
              show: true,
            },
          },
        ],
      },
    };
    this.lineOption = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
        }],
      },
    };
    this.horizontalBarOption = {
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true,
          },
        }],
      },
    };
    this.colors = ['rgba(51, 102, 204, 1)', 'rgba(220, 57, 18, 1)', 'rgba(255, 153, 0, 1)', 'rgba(16, 150, 24, 1)', 'rgba(153, 0, 153, 1)',
      'rgba(59, 62, 172, 1)', 'rgba(0, 153, 198, 1)', 'rgba(221, 68, 119, 1)', 'rgba(102, 170, 0, 1)', 'rgba(184, 46, 46, 1)',
      'rgba(49, 99, 149, 1)', 'rgba(153, 68, 153, 1)', 'rgba(34, 170, 153, 1)', 'rgba(170, 170, 17, 1)', 'rgba(102, 51, 204, 1)',
      'rgba(230, 115, 0, 1)', 'rgba(139, 7, 7, 1)', 'rgba(50, 146, 98, 1)', 'rgba(85, 116, 166, 1)', 'rgba(59, 62, 172, 1)'];

    this.chartTemplate = {
      labels: [],
      datasets: [],
    };
  }

  makeOpaque(color, degree) {
    let Opaque = color;
    Opaque = Opaque.substring(0, Opaque.length - 2) + degree + ')';
    return Opaque;
  }

  makeBarDataset(label, index) {
    const barData = {
      label,
      backgroundColor: this.makeOpaque(this.colors[index], 0.4),
      borderColor: this.colors[index],
      borderWidth: 1,
      hoverBackgroundColor: this.makeOpaque(this.colors[index], 0.4),
      hoverBorderColor: this.colors[index],
      data: [],
    };
    return barData;
  }

  makeLineDataset(label, index) {
    console.log(label, index);
    const lineData = {
      label,
      type: 'line',
      fill: false,
      lineTension: 0.1,
      backgroundColor: this.makeOpaque(this.colors[index], 0.4),
      borderColor: this.colors[index],
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: this.colors[index],
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: this.colors[index],
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [],
    };
    return lineData;
  }

  getDoughnutTemplate() {
    const chartData = {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
      }],
    };
    return chartData;
  }

  getLineTemplate(innerLabels) {
    console.log(innerLabels);
    const chartData = cloneDeep(this.chartTemplate);
    innerLabels.forEach((label, index) => {
      chartData.datasets.push(this.makeLineDataset(label, index));
    });
    return chartData;
  }

  getBarTemplate(innerLabels) {
    const chartData = cloneDeep(this.chartTemplate);
    innerLabels.forEach((label, index) => {
      chartData.datasets.push(this.makeBarDataset(label, index));
    });
    return chartData;
  }


  getRadarTemplate(innerLabels) {
    const chartData = cloneDeep(this.chartTemplate);
    innerLabels.forEach((label) => {
      chartData.labels.push(label);
    });
    return chartData;
  }

  getMixedTemplate(options) {
    const chartData = cloneDeep(this.chartTemplate);
    options.forEach((data, index) => {
      if (data.type === 'line') {
        chartData.datasets.push(this.makeLineDataset(data.label, index));
      } else if (data.type === 'bar') {
        chartData.datasets.push(this.makeBarDataset(data.label, index));
      }
    });
    return chartData;
  }

  createCharts(datalist) {
    const charts = [];
    console.log(datalist);
    datalist.forEach((chart) => {
      let allZero = true;
      if (chart.data.datasets.length) {
        chart.data.datasets[0].data.forEach((data) => {
          if (data !== 0) allZero = false;
        });
      }
      if (allZero || !chart.data.datasets[0].data.length) {
        charts.push(
          <div>
            <h3>{chart.title}</h3>
            <h3>데이터를 추가해주세요!</h3>
            <br />
            <hr />
          </div>
        );
      } else {
        if (chart.type === 'Doughnut') {
          charts.push(
            <div className="Chart">
              <h3>{chart.title}</h3>
              <Doughnut
                data={chart.data}
              />
              <br />
              <hr />
            </div>
          );
        } else if (chart.type === 'Radar') {
          charts.push(
            <div className="Chart">
              <h3>{chart.title}</h3>
              <Radar
                data={chart.data}
              />
              <br />
              <hr />
            </div>
          );
        } else if (chart.type === 'Line') {
          charts.push(
            <div>
              <h3>{chart.title}</h3>
              <Line
                data={chart.data}
                options={this.lineOption}
              />
              <br />
              <hr />
            </div>
          );
        } else if (chart.type === 'Mixed') {
          charts.push(
            <div>
              <h3>{chart.title}</h3>
              <Bar
                data={chart.data}
                options={this.mixedOption}
              />
              <br />
              <hr />
            </div>
          );
        } else if (chart.type === 'HorizontalBar') {
          charts.push(
            <div>
              <h3>{chart.title}</h3>
              <HorizontalBar
                data={chart.data}
                options={this.horizontalBarOption}
              />
              <br />
              <hr />
            </div>
          );
        }
      }
    });
    return charts;
  }
}

export default ReportChart;
