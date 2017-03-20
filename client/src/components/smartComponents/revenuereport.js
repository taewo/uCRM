import React, { Component } from 'react';
import { Line, Bar, Doughnut, HorizontalBar } from 'react-chartjs-2';

class RevenueReport extends Component {

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
    if (this.state.type === '이번달이익요약분석') {
      nextChartData.push({
        type: 'Mixed',
        data: this.createMixedDataSet(),
        title: '이번달 이익/비용 요약 분석',
      });
    } else if (this.state.type === '이번달이익세부분석') {
      nextChartData.push({
        type: 'HorizontalBar',
        data: this.createPlansNetRevenueComparisonDataSet(),
        title: '이번달 요금제별 순이익',
      });
      nextChartData.push({
        type: 'Doughnut',
        data: this.createPlansNetRevenuePercentageDataSet(),
        title: '이번달 요금제별 순이익 점유율',
      });
    } else if (this.state.type === '요금제별연간이익분석') {
      nextChartData.push({
        type: 'HorizontalBar',
        data: this.createPlansNetRevenueComparisonDataSet(),
        title: '올해 요금제별 순이익',
      });
      nextChartData.push({
        type: 'Doughnut',
        data: this.createPlansNetRevenuePercentageDataSet(),
        title: '올해 요금제별 순이익 점유율',
      });
    } else if (this.props.type === '이익흐름분석') {
      nextChartData.push({
        type: 'Line',
        data: this.createFlowDataSet(),
        title: '연간 순이익 흐름 분석',
      });
    }
    return nextChartData;
  }

  createMixedDataSet() {
    console.log(this.props.data);
    const data = {
      labels: [],
      datasets: [{
        label: '순이익',
        type: 'line',
        data: [],
        fill: false,
        borderColor: this.makeOpaque(this.state.colors[1], 0.9),
        backgroundColor: this.state.colors[1],
        pointBorderColor: this.state.colors[1],
        pointBackgroundColor: this.state.colors[1],
        pointHoverBackgroundColor: this.state.colors[1],
        pointHoverBorderColor: this.state.colors[1],
      }, {
        type: 'bar',
        label: '총 수입',
        data: [],
        fill: false,
        backgroundColor: this.makeOpaque(this.state.colors[2], 0.8),
        borderColor: this.makeOpaque(this.state.colors[2], 0.8),
        hoverBackgroundColor: this.state.colors[2],
        hoverBorderColor: this.state.colors[2],
      }, {
        type: 'bar',
        label: '총 비용',
        data: [],
        fill: false,
        backgroundColor: this.makeOpaque(this.state.colors[3], 0.8),
        borderColor: this.makeOpaque(this.state.colors[3], 0.8),
        hoverBackgroundColor: this.state.colors[3],
        hoverBorderColor: this.state.colors[3],
      }],
    };
    if (this.props.data.length) {
      this.props.data.forEach((MonthlyData) => {
        data.labels.push(MonthlyData.Month);
        data.datasets[0].data.push(MonthlyData.balance);
        data.datasets[1].data.push(MonthlyData.revenues);
        data.datasets[2].data.push(MonthlyData.expense);
      });
    }
    return data;
  }

  createPlansNetRevenueComparisonDataSet() {
    console.log(this.props.data);
    const data = {
      labels: [],
      datasets: [
        {
          label: '순이익',
          backgroundColor: this.makeOpaque(this.state.colors[0], 0.4),
          borderColor: this.state.colors[0],
          borderWidth: 1,
          hoverBackgroundColor: this.makeOpaque(this.state.colors[0], 0.4),
          hoverBorderColor: this.state.colors[0],
          data: []
        }
      ]
    };
    if (this.props.data.length) {
      this.props.data.forEach((BillingPlan) => {
        data.labels.push(BillingPlan.BillingPlan);
        data.datasets[0].data.push(Math.round(BillingPlan.real_cost));
      });
    }
    return data;
  }

  createPlansNetRevenuePercentageDataSet() {
    const data = {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
      }],
    };
    if (this.props.data.length) {
      this.props.data.forEach((BillingPlan, index) => {
        data.labels.push(BillingPlan.BillingPlan);
        data.datasets[0].data.push(Math.round(BillingPlan.real_cost_percentage));
        data.datasets[0].backgroundColor.push(this.state.colors[index]);
        data.datasets[0].hoverBackgroundColor.push(this.state.colors[index]);
      });
    }
    return data;
  }

  createFlowDataSet() {
    console.log(this.props.data);
    const data = {
      labels: [],
      datasets: [{
        label: '월당 순이익',
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
      this.props.data.forEach((monthlyData) => {
        console.log(monthlyData)
        data.labels.push(monthlyData.Month + '월');
        data.datasets[0].data.push(monthlyData.balance);
      });
    }
    return data;
  }

  render() {
    const chartDataList = this.createDataSet();
    const charts = [];
    const extendYtoZero = {
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
                options={extendYtoZero}
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

export default RevenueReport;
