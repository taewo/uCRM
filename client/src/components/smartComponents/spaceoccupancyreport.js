import React from 'react';
import ReportChart from './reportchart';

class SpaceOccupancyReport extends ReportChart {

  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
    };
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
    const data = this.getDoughnutTemplate();
    if (this.props.data.length) {
      this.props.data.forEach((billingPlan, index) => {
        data.labels.push(billingPlan.BillingPlan + '(%)');
        data.datasets[0].data.push(Math.round(billingPlan.BillingPlanOccupancyRate));
        data.datasets[0].backgroundColor.push(this.colors[index]);
        data.datasets[0].hoverBackgroundColor.push(this.colors[index]);
      });
    }
    return data;
  }

  createTotalOccupancyDataSet() {
    const data = this.getDoughnutTemplate();
    if (this.props.data.length) {
      let i;
      let total = 0;
      for (i = 0; i < this.props.data.length; i += 1) {
        const currentData = this.props.data[i];
        const currentRate = Math.round(currentData.TotalOccupancyRate);
        data.labels.push(currentData.BillingPlan + '(%)');
        data.datasets[0].data.push(currentRate);
        total += currentRate;
        data.datasets[0].backgroundColor.push(this.colors[i]);
        data.datasets[0].hoverBackgroundColor.push(this.colors[i]);
      }
      i += 1;
      data.labels.push('미사용중(%)');
      data.datasets[0].data.push(100 - total);
      data.datasets[0].backgroundColor.push(this.colors[i]);
      data.datasets[0].hoverBackgroundColor.push(this.colors[i]);
    }
    return data;
  }

  createYearlyFlowDataSet() {
    const data = this.getLineTemplate(['월당 이용률(%)']);
    if (this.props.data.length) {
      console.log(data.datasets[0]);
      this.props.data.forEach((monthlySpaceOccupancy) => {
        data.labels.push(monthlySpaceOccupancy.Month + '월');
        data.datasets[0].data.push(monthlySpaceOccupancy.OccupancyRate);
      });
    }
    return data;
  }

  createWeeksFlowDataSet() {
    const data = this.getLineTemplate(['주당 이용률(%)']);
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
    const charts = this.createCharts(chartDataList);
    return (
      <div>
        { charts }
      </div>
    );
  }
}

export default SpaceOccupancyReport;
