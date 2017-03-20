import React, { Component } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';


class ChurnReport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      colors: ['rgba(51, 102, 204, 1)', 'rgba(220, 57, 18, 1)', 'rgba(255, 153, 0, 1)', 'rgba(16, 150, 24, 1)', 'rgba(153, 0, 153, 1)',
        'rgba(59, 62, 172, 1)', 'rgba(0, 153, 198, 1)', 'rgba(221, 68, 119, 1)', 'rgba(102, 170, 0, 1)', 'rgba(184, 46, 46, 1)',
        'rgba(49, 99, 149, 1)', 'rgba(153, 68, 153, 1)', 'rgba(34, 170, 153, 1)', 'rgba(170, 170, 17, 1)', 'rgba(102, 51, 204, 1)',
        'rgba(230, 115, 0, 1)', 'rgba(139, 7, 7, 1)', 'rgba(50, 146, 98, 1)', 'rgba(85, 116, 166, 1)', 'rgba(59, 62, 172, 1)'],
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
    if (this.state.type === '이번달' || this.state.type === '지난달') {
      nextChartData.push({
        type: 'Doughnut',
        data: this.createSingleDataSet(this.state.type),
        title: `${this.state.type} 이탈율 분석`
      });
    } else if (this.state.type === '이탈흐름분석') {
      nextChartData.push({
        type: 'Line',
        data: this.createFlowDataSet(),
        title: `연간 이탈 흐름 분석`
      });
    } else if (this.props.type === '비교분석') {
      nextChartData.push({
        type: 'Doughnut',
        data: this.createSingleDataSet('이번달'),
        title: `이번달 이탈율`
      });
      nextChartData.push({
        type: 'Doughnut',
        data: this.createSingleDataSet('지난달'),
        title: `지난달 이탈율`
      });
    }
    return nextChartData;
  }

  createSingleDataSet(type) {
    const data = {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
      }],
    };
    if (type === '이번달') {
      if (this.props.data.length) {
        this.props.data.forEach((churnReason, index) => {
          data.labels.push(churnReason.index);
          data.datasets[0].data.push(churnReason.ThisPercentage);
          data.datasets[0].backgroundColor.push(this.state.colors[index]);
          data.datasets[0].hoverBackgroundColor.push(this.state.colors[index]);
        });
      }
    } else if (type === '지난달') {
      if (this.props.data.length) {
        this.props.data.forEach((churnReason, index) => {
          data.labels.push(churnReason.index);
          data.datasets[0].data.push(churnReason.LastPercentage);
          data.datasets[0].backgroundColor.push(this.state.colors[index]);
        });
      }
    }
    return data;
  }

  createFlowDataSet() {
    const data = {
      labels: [],
      datasets: [{
        label: '월당 이탈율',
        fill: false,
        lineTension: 0.1,
        backgroundColor: this.makeOpaque(this.state.colors[0], 0.4),
        borderColor: this.state.colors[0],
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: this.state.colors[0],
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: this.state.colors[0],
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [],
      },
      ],
    };
    if (this.props.data.length) {
      this.props.data.forEach((churnData) => {
        data.labels.push(churnData.Month + '월');
        data.datasets[0].data.push(churnData.Churns);
      });
    }
    return data;
  }

  render() {
    const chartDataList = this.createDataSet();
    const charts = [];
    chartDataList.forEach((chart) => {
      let allZero = true;
      chart.data.datasets[0].data.forEach((data) => {
        if (data !== 0) allZero = false;
      });
      if (allZero || !chart.data.datasets[0].data.length) {
        charts.push(
          <div>
            <h3>{chart.title}</h3>
            <h3>데이터가 충분치 않습니다</h3>
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
        } else if (chart.type === 'Line') {
          charts.push(
            <div>
              <h3>{chart.title}</h3>
              <Line
                data={chart.data}
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

export default ChurnReport;
