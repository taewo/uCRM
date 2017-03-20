import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class SpaceOccupancyTable extends Component {

  transformData() {
    const dataset = [];
    if (this.props.data.length) {
      if (this.props.type === '요금제별분석') {
        let OccupyingNumberSum = 0;
        let TotalOccupancyRateSum = 0;
        this.props.data.forEach((rows) => {
          const newRow = Object.assign({}, rows);
          newRow.BillingPlanOccupancyRate = Math.round(newRow.BillingPlanOccupancyRate);
          newRow.TotalOccupancyRate = Math.round(newRow.TotalOccupancyRate);
          OccupyingNumberSum += newRow.OccupyingNumber;
          TotalOccupancyRateSum += newRow.TotalOccupancyRate;
          dataset.push(newRow);
        });
        dataset.push({ BillingPlan: '총합', OccupyingNumber: OccupyingNumberSum, BillingPlanOccupancyRate: '-', TotalOccupancyRate: TotalOccupancyRateSum });
      } else if (this.props.type === '최근이용률') {
        this.props.data.forEach((rows) => {
          const newRow = Object.assign({}, rows);
          newRow.OccupancyRate = Math.round(newRow.OccupancyRate);
          newRow.Weeks += '주차';
          dataset.push(newRow);
        });
      } else if (this.props.type === '이용률흐름분석') {
        this.props.data.forEach((rows) => {
          const newRow = Object.assign({}, rows);
          newRow.OccupancyRate = Math.round(newRow.OccupancyRate);
          newRow.Month += '월';
          dataset.push(newRow);
        });
      }
    }
    return dataset;
  }


  render() {
    const tables = [];
    const tableDataSet = this.transformData();
    console.log(tableDataSet);
    if (this.props.type === '요금제별분석') {
      tables.push(
        <BootstrapTable data={tableDataSet} striped hover condensed options={ { noDataText: '데이터가 없습니다' } }>
          <TableHeaderColumn dataField="BillingPlan" isKey>요금제</TableHeaderColumn>
          <TableHeaderColumn dataField="OccupyingNumber">해당 회원 수</TableHeaderColumn>
          <TableHeaderColumn dataField="BillingPlanOccupancyRate">요금제별 이용률(%)</TableHeaderColumn>
          <TableHeaderColumn dataField="TotalOccupancyRate">실 이용률(%)</TableHeaderColumn>
        </BootstrapTable>
      );
    } else if (this.props.type === '최근이용률') {
      tables.push(
        <BootstrapTable data={tableDataSet} striped hover condensed options={ { noDataText: '데이터가 없습니다' } }>
          <TableHeaderColumn dataField="Weeks" isKey>주차</TableHeaderColumn>
          <TableHeaderColumn dataField="OccupyingNumber">회원 수</TableHeaderColumn>
          <TableHeaderColumn dataField="OccupancyRate">실 이용률(%)</TableHeaderColumn>
        </BootstrapTable>
      );
    } else if (this.props.type === '이용률흐름분석') {
      tables.push(
        <BootstrapTable data={tableDataSet} striped hover condensed options={ { noDataText: '데이터가 없습니다' } }>
          <TableHeaderColumn dataField="Month" isKey>월</TableHeaderColumn>
          <TableHeaderColumn dataField="OccupyingNumber">회원 수</TableHeaderColumn>
          <TableHeaderColumn dataField="OccupancyRate">실 이용률(%)</TableHeaderColumn>
        </BootstrapTable>
      );
    }
    return (
      <div>
        { tables }
      </div>
    );
  }
}

export default SpaceOccupancyTable;
