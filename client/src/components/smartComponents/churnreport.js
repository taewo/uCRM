import React, { Component } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';


class ChurnReport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reason_mapper: {
        growth: '회사 성장',
        moved: '회사 이전',
        new_job: '이직',
        financial_reason: '금전적 사유',
        dissatisfaction: '불만족',
      },
      colors: ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E', '#316395',
        '#994499', '#22AA99', '#AAAA11', '#6633CC', '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'],
      hidden: 'hidden',
    };
  }

  componentWillMount() {
    setTimeout(() => {
      this.show();
    }, this.props.wait);
  }

  componentDidMount() {
    console.log('child did mount');
  }

  show() {
    this.setState({ hidden: '' });
  }

  createDataSet() {
    const nextChartData = [];
    if (this.props.type === '이번달' || this.props.type === '지난달') {
      nextChartData.push({
        type: 'Doughnut',
        data: this.createSingleDataSet(this.props.type),
        title: `${this.props.type} 이탈율 분석`
      });
    } else if (this.props.type === '이탈흐름분석') {
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
    console.log(this.props);
    const data = {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
      }],
      options: {
        title: {
          display: true,
          text: `${type} 이탈율 분석`,
        },
      },
    };
    let count = 0;
    if (type === '이번달') {
      if (JSON.stringify(this.props.data) !== '{}') {
        this.props.data.forEach((churnReason) => {
          data.labels.push(this.state.reason_mapper[churnReason.index]);
          data.datasets[0].data.push(churnReason.ThisPercentage);
          data.datasets[0].backgroundColor.push(this.state.colors[count]);
          data.datasets[0].hoverBackgroundColor.push(this.state.colors[count]);
          count += 1;
        });
      }
    } else if (type === '지난달') {
      if (JSON.stringify(this.props.data) !== '{}') {
        this.props.data.forEach((churnReason) => {
          data.labels.push(this.state.reason_mapper[churnReason.index]);
          data.datasets[0].data.push(churnReason.LastPercentage);
          data.datasets[0].backgroundColor.push(this.state.colors[count]);
          data.datasets[0].hoverBackgroundColor.push(this.state.colors[count]);
          count += 1;
        });
      }
    }
    return data;
  }

  createFlowDataSet() {
    console.log(this.props);
    const data = {
      labels: [],
      datasets: [{
        label: '월당 이탈율',
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
      ],
    };
    if (JSON.stringify(this.props.data) !== '{}') {
      this.props.data.forEach((churnData) => {
        data.labels.push(churnData.Month + '월');
        data.datasets[0].data.push(churnData.Churns);
        // data.datasets[0].backgroundColor.push(this.state.colors[count]);
        // data.datasets[0].hoverBackgroundColor.push(this.state.colors[count]);
      });
    }
    return data;
  }

  render() {
    const chartDataList = this.createDataSet();
    const charts = [];
    console.log(chartDataList);
    chartDataList.forEach((chart) => {
      console.log(chart.data.datasets[0].data);
      console.log(chart.data.datasets[0].data.length);
      let allZero = true;
      chart.data.datasets[0].data.forEach((data) => {
        if (data !== 0) allZero = false;
      });
      if (allZero || !chart.data.datasets[0].data.length) {
        charts.push(
          <div>
            <h2>{chart.title}</h2>
            <h3>데이터가 충분치 않습니다</h3>
          </div>
        );
      } else {
        if (chart.type === 'Doughnut') {
          charts.push(
            <div>
              <h2>{chart.title}</h2>
              <Doughnut data={chart.data} />
            </div>
          );
        } else if (chart.type === 'Line') {
          charts.push(
            <div>
              <h2>{chart.title}</h2>
              <Line data={chart.data} />
            </div>
          );
        }
      }
    });
    console.log(charts);
    return (
      <div className={this.state.hidden}>
        { charts }
      </div>
    );
  }
}

export default ChurnReport;
