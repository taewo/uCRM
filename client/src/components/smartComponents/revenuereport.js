import React from 'react';
import ReportChart from './reportchart';

class RevenueReport extends ReportChart {

  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
    };
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
    const data = this.getMixedTemplate([{label: '순이익', type: 'line'}, {label: '총 수입', type: 'bar'}, {label: '총 비용', type: 'bar'}])
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
    const data = this.getBarTemplate(['순이익']);
    console.log(data);
    if (this.props.data.length) {
      this.props.data.forEach((BillingPlan) => {
        data.labels.push(BillingPlan.BillingPlan);
        data.datasets[0].data.push(Math.round(BillingPlan.real_cost));
      });
    }
    return data;
  }

  createPlansNetRevenuePercentageDataSet() {
    const data = this.getDoughnutTemplate();
    if (this.props.data.length) {
      this.props.data.forEach((BillingPlan, index) => {
        data.labels.push(BillingPlan.BillingPlan);
        data.datasets[0].data.push(Math.round(BillingPlan.real_cost_percentage));
        data.datasets[0].backgroundColor.push(this.colors[index]);
        data.datasets[0].hoverBackgroundColor.push(this.colors[index]);
      });
    }
    return data;
  }

  createFlowDataSet() {
    console.log(this.props.data);
    const data = this.getLineTemplate(['월당 순이익']);
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
    const charts = this.createCharts(chartDataList);
    return (
      <div>
        { charts }
      </div>
    );
  }
}

export default RevenueReport;
