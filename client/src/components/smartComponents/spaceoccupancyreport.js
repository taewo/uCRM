import React, { Component } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';

class SpaceOccupancyReport extends Component {

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
    if (this.state.type === '이용률흐름분석') {
      nextChartData.push({
        type: 'Line',
        data: this.createYearlyFlowDataSet(),
        title: '이용률 흐름 분석',
      });
    } else if (this.state.type === '요금제별분석') {
      nextChartData.push({
        type: 'Doughnut',
        data: this.createBillingOccupancyDataSet(),
        title: '요금제별 이용률',
      });
      nextChartData.push({
        type: 'Doughnut',
        data: this.createTotalOccupancyDataSet(),
        title: '총 정원 대비 요금제별 이용률',
      });
    } else if (this.state.type === '최근이용률') {
      nextChartData.push({
        type: 'Line',
        data: this.createWeeksFlowDataSet(),
        title: '최근 이용률 추이 분석',
      });
    }
    return nextChartData;
  }

  createBillingOccupancyDataSet() {
    const data = {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
      }],
    };
    if (this.props.data.length) {
      this.props.data.forEach((billingPlan, index) => {
        data.labels.push(billingPlan.BillingPlan);
        data.datasets[0].data.push(Math.round(billingPlan.BillingPlanOccupancyRate));
        data.datasets[0].backgroundColor.push(this.state.colors[index]);
        data.datasets[0].hoverBackgroundColor.push(this.state.colors[index]);
      });
    }
    return data;
  }

  createTotalOccupancyDataSet() {
    const data = {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
      }],
    };
    if (this.props.data.length) {
      let i;
      let total = 0;
      for (i = 0; i < this.props.data.length; i += 1) {
        const currentData = this.props.data[i];
        const currentRate = Math.round(currentData.TotalOccupancyRate);
        data.labels.push(currentData.BillingPlan);
        data.datasets[0].data.push(currentRate);
        total += currentRate;
        data.datasets[0].backgroundColor.push(this.state.colors[i]);
        data.datasets[0].hoverBackgroundColor.push(this.state.colors[i]);
      }
      i += 1;
      data.labels.push('미사용중');
      data.datasets[0].data.push(100 - total);
      data.datasets[0].backgroundColor.push(this.state.colors[i]);
      data.datasets[0].hoverBackgroundColor.push(this.state.colors[i]);
    }
    return data;
  }

  createYearlyFlowDataSet() {
    const data = {
      labels: [],
      datasets: [{
        label: '월당 이용률 (%)',
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
      }],
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }]
        }
      }
    };
    if (this.props.data.length) {
      this.props.data.forEach((monthlySpaceOccupancy) => {
        data.labels.push(monthlySpaceOccupancy.Month + '월');
        data.datasets[0].data.push(monthlySpaceOccupancy.OccupancyRate);
      });
    }
    return data;
  }

  createWeeksFlowDataSet() {
    const data = {
      labels: [],
      datasets: [{
        label: '주당 이용률 (%)',
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
      }],
    };
    if (this.props.data.length) {
      this.props.data.forEach((weeklySpaceOccupancy) => {
        data.labels.push(weeklySpaceOccupancy.Weeks + '주');
        data.datasets[0].data.push(weeklySpaceOccupancy.OccupancyRate);
      });
    }
    return data;
  }


  render() {
    const chartDataList = this.createDataSet();
    const charts = [];
    const lineOption = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
        }],
      },
    };
    console.log(chartDataList);
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
                options={lineOption}
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

export default SpaceOccupancyReport;
