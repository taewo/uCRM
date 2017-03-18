import React, { Component } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';

class SpaceOccupancyReport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      colors: ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E', '#316395',
        '#994499', '#22AA99', '#AAAA11', '#6633CC', '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'],
      type: this.props.type,
    };
  }

  componentDidMount() {
    console.log('child did mount');
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
      }],
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
        if (chart.type === 'Doughnut') {
          charts.push(
            <div className="Chart">
              <h2>{chart.title}</h2>
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
              <h2>{chart.title}</h2>
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

export default SpaceOccupancyReport;
