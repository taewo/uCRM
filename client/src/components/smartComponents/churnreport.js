import React from 'react';
import ReportChart from './reportchart';


class ChurnReport extends ReportChart {

  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
    };
  }

  createDataSet() {
    const nextChartData = [];
    if (this.state.type === '이번달' || this.state.type === '지난달') {
      nextChartData.push({
        type: 'Doughnut',
        data: this.createSingleDataSet(this.state.type),
        title: `${this.state.type} 이탈율 분석`,
      });
    } else if (this.state.type === '이탈흐름분석') {
      nextChartData.push({
        type: 'Line',
        data: this.createFlowDataSet(),
        title: `연간 이탈 흐름 분석`,
      });
    } else if (this.props.type === '비교분석') {
      nextChartData.push({
        type: 'Doughnut',
        data: this.createSingleDataSet('이번달'),
        title: `이번달 이탈율`,
      });
      nextChartData.push({
        type: 'Doughnut',
        data: this.createSingleDataSet('지난달'),
        title: `지난달 이탈율`,
      });
    }
    return nextChartData;
  }

  createSingleDataSet(type) {
    const data = this.getDoughnutTemplate();
    if (type === '이번달') {
      if (this.props.data.length) {
        this.props.data.forEach((churnReason, index) => {
          data.labels.push(churnReason.index);
          data.datasets[0].data.push(churnReason.ThisPercentage);
          data.datasets[0].backgroundColor.push(this.colors[index]);
          data.datasets[0].hoverBackgroundColor.push(this.colors[index]);
        });
      }
    } else if (type === '지난달') {
      if (this.props.data.length) {
        this.props.data.forEach((churnReason, index) => {
          data.labels.push(churnReason.index);
          data.datasets[0].data.push(churnReason.LastPercentage);
          data.datasets[0].backgroundColor.push(this.colors[index]);
        });
      }
    }
    return data;
  }

  createFlowDataSet() {
    const data = this.getLineTemplate(['월당 이탈율']);
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
    const charts = this.createCharts(chartDataList);
    return (
      <div>
        { charts }
      </div>
    );
  }
}

export default ChurnReport;
