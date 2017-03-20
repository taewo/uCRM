import React from 'react';
import ReportChart from './reportchart';

class LeadReport extends ReportChart {

  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
    };
  }

  createDataSet() {
    const nextChartData = [];
    if (this.state.type === '요약') {
      nextChartData.push({
        type: 'Mixed',
        data: this.createMixedDataSet(),
        title: '이번달 잠재고객 요약 분석',
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
    const data = this.getMixedTemplate([
      { label: '전환율(%)', type: 'line' },
      { label: '방문 / 문의', type: 'bar' },
      { label: '전환', type: 'bar' },
    ]);
    if (this.props.data.length) {
      data.datasets[1].yAxisID = 'y-axis-2';
      data.datasets[2].yAxisID = 'y-axis-2';
      this.props.data.forEach((channel) => {
        data.labels.push(channel.Channels);
        data.datasets[0].data.push(Math.round(channel.ThisConversionPercentage));
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
      datasets: [],
    };
    if (this.props.data.length) {
      this.props.data.forEach((channel, index) => {
        data.datasets.push(
          {
            label: channel.Channels,
            backgroundColor: this.makeOpaque(this.colors[index], 0.4),
            borderColor: this.makeOpaque(this.colors[index], 0.7),
            pointBackgroundColor: this.colors[index],
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: this.colors[index],
            data: [channel.ThisMonth, channel.ThisConversion, Math.round(channel.ThisConversionPercentage / 100), channel.LastMonth, channel.LastConversion, Math.round(channel.LastConversionPercentage / 100)],
          }
        );
      });
    }
    return data;
  }

  createFlowDataSet() {
    console.log(this.props.data);
    const data = this.getLineTemplate(['월당 문의 / 방문', '입주 전환']);
    if (this.props.data.length) {
      this.props.data.forEach((monthlyLead) => {
        data.labels.push(monthlyLead.Month + '월');
        data.datasets[0].data.push(monthlyLead.Leads);
        data.datasets[1].data.push(monthlyLead.ActualConversion);
      });
    }
    console.log(data);
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

export default LeadReport;
