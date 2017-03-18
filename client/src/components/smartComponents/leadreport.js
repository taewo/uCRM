import React, { Component } from 'react';
import { Radar, Line, Bar } from 'react-chartjs-2';

const options = {
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


class LeadReport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      channel_mapper: {
        email: '이메일',
        phone: '전화 문의',
        tour: '직접 방문',
      },
      colors: ['rgba(51, 102, 204, 1)', 'rgba(220, 57, 18, 1)', 'rgba(255, 153, 0, 1)', 'rgba(16, 150, 24, 1)', 'rgba(153, 0, 153, 1)', 'rgba(59, 62, 172, 1)'],
      type: this.props.type,
    };
  }

  componentDidMount() {
    console.log('child did mount');
  }

  makeOpaque(color, degree) {
    let Opaque = color;
    Opaque = Opaque.substring(0, Opaque.length - 2) + degree + ')';
    return Opaque;
  }

  createDataSet() {
    const nextChartData = [];
    if (this.state.type === '요약') {
      nextChartData.push({
        type: 'Mixed',
        data: this.createMixedDataSet(),
        title: '이번달 잠재고객 요약 분석',
        options,
      });
    } else if (this.state.type === '채널별비교') {
      nextChartData.push({
        type: 'Radar',
        data: this.createChannelsDataSet(),
        title: '채널별 성과 비교',
      });
    } else if (this.props.type === '잠재고객흐름분석') {
      nextChartData.push({
        type: 'Line',
        data: this.createFlowDataSet(),
        title: '잠재 고객 흐름 분석',
      });
    }
    return nextChartData;
  }

  createMixedDataSet() {
    console.log(this.props.data);
    const data = {
      labels: [],
      datasets: [{
        label: '전환율(%)',
        type: 'line',
        data: [],
        fill: false,
        borderColor: this.makeOpaque(this.state.colors[1], 0.9),
        backgroundColor: this.state.colors[1],
        pointBorderColor: this.state.colors[1],
        pointBackgroundColor: this.state.colors[1],
        pointHoverBackgroundColor: this.state.colors[1],
        pointHoverBorderColor: this.state.colors[1],
        yAxisID: 'y-axis-1',
      }, {
        type: 'bar',
        label: '방문 / 문의',
        data: [],
        fill: false,
        backgroundColor: this.makeOpaque(this.state.colors[2], 0.8),
        borderColor: this.makeOpaque(this.state.colors[2], 0.8),
        hoverBackgroundColor: this.state.colors[2],
        hoverBorderColor: this.state.colors[2],
        yAxisID: 'y-axis-2',
      }, {
        type: 'bar',
        label: '전환',
        data: [],
        fill: false,
        backgroundColor: this.makeOpaque(this.state.colors[3], 0.8),
        borderColor: this.makeOpaque(this.state.colors[3], 0.8),
        hoverBackgroundColor: this.state.colors[3],
        hoverBorderColor: this.state.colors[3],
        yAxisID: 'y-axis-2',
      }],
    };
    if (this.props.data.length) {
      this.props.data.forEach((channel) => {
        data.labels.push(this.state.channel_mapper[channel.Channels]);
        data.datasets[0].data.push(channel.ThisConversionPercentage);
        data.datasets[1].data.push(channel.ThisMonth);
        data.datasets[2].data.push(channel.ThisConversion);
      });
    }
    return data;
  }

  createChannelsDataSet() {
    console.log(this.props.data);
    const data = {
      labels: ['이번달 방문/문의', '이번달 전환', '이번달 전환율', '지난달 방문/문의', '지난달 전환', '지난달 전환율'],
      datasets: [

      ]
    };
    if (this.props.data.length) {
      this.props.data.forEach((channel, index) => {
        data.datasets.push(
          {
            label: this.state.channel_mapper[channel.Channels],
            backgroundColor: this.makeOpaque(this.state.colors[index], 0.5),
            borderColor: this.state.colors[index],
            pointBackgroundColor: this.state.colors[index],
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: this.state.colors[index],
            data: [channel.ThisMonth, channel.ThisConversion, channel.ThisConversionPercentage / 100, channel.LastMonth, channel.LastConversion, channel.LastConversionPercentage / 100],
          }
        );
      });
    }
    return data;
  }

  createFlowDataSet() {
    console.log(this.props.data);
    const data = {
      labels: [],
      datasets: [{
        label: '월당 문의 / 방문',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [],
      },
      {
        label: '입주 전환',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(255,99,132,0.4)',
        borderColor: 'rgba(255,99,132,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(255,99,132,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(255,99,132,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [],
      }
      ],
    };
    if (this.props.data.length) {
      this.props.data.forEach((monthlyLead) => {
        data.labels.push(monthlyLead.Month + '월');
        data.datasets[0].data.push(monthlyLead.Leads);
        data.datasets[1].data.push(monthlyLead.ActualConversion);
      });
    }
    return data;
  }

  render() {
    const chartDataList = this.createDataSet();
    const charts = [];
    console.log(chartDataList);
    chartDataList.forEach((chart) => {
      let allZero = true;
      chart.data.datasets[0].data.forEach((data) => {
        if (data !== 0) allZero = false;
      });
      if (allZero || !chart.data.datasets[0].data.length) {
        charts.push(
          <div>
            <h2>{chart.title}</h2>
            <h3>데이터가 충분치 않습니다</h3>
            <br />
            <hr />
          </div>
        );
      } else {
        if (chart.type === 'Radar') {
          charts.push(
            <div className="Chart">
              <h2>{chart.title}</h2>
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
              <h2>{chart.title}</h2>
              <Line
                data={chart.data}
              />
              <br />
              <hr />
            </div>
          );
        } else if (chart.type === 'Mixed') {
          charts.push(
            <div>
              <h2>{chart.title}</h2>
              <Bar
                data={chart.data}
                options={chart.options}
              />
              <br />
              <hr />
            </div>
          );
        }
      }
    });
    return (
      <div>
        { charts }
      </div>
    );
  }
}

export default LeadReport;
