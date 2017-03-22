import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import ReportTable from './reportTable';

class ChurnTable extends ReportTable {

  transformData() {
    const dataset = [];
    if (this.props.data.length) {
      if (this.props.type === '비교분석' || this.props.type === '이번달' || this.props.type === '지난달') {
        let total = { index: '총합', ThisMonth: 0, ThisPercentage: '-', LastMonth: 0, LastPercentage: '-', change: '-' };
        this.props.data.forEach((rows) => {
          const newRow = Object.assign({}, rows);
          total.ThisMonth += newRow.ThisMonth;
          total.LastMonth += newRow.LastMonth;
          newRow.change = this.getDelta(newRow.ThisMonth, newRow.LastMonth);
          dataset.push(newRow);
        });
        total.change = this.getDelta(total.ThisMonth, total.LastMonth);
        console.log(dataset);
        dataset.push(total);
      } else if (this.props.type === '이탈흐름분석') {
        let churnSum = 0;
        this.props.data.forEach((rows) => {
          const newRow = Object.assign({}, rows);
          churnSum += rows.Churns;
          newRow.Month += '월';
          dataset.push(newRow);
        });
        dataset.push({ Month: '총합', Churns: churnSum });
      }
    }
    return dataset;
  }


  render() {
    const tables = [];
    const tableDataSet = this.transformData();
    if (this.props.type === '비교분석') {
      tables.push(
        <BootstrapTable data={tableDataSet} striped hover condensed options={ { noDataText: '데이터가 없습니다' } }>
          <TableHeaderColumn dataField="index" isKey>이탈 사유</TableHeaderColumn>
          <TableHeaderColumn dataField="ThisMonth">이번달 이탈</TableHeaderColumn>
          <TableHeaderColumn dataField="ThisPercentage">이탈률(%)</TableHeaderColumn>
          <TableHeaderColumn dataField="LastMonth">지난달 이탈</TableHeaderColumn>
          <TableHeaderColumn dataField="LastPercentage">이탈률(%)</TableHeaderColumn>
          <TableHeaderColumn dataField="change">전월 대비</TableHeaderColumn>
        </BootstrapTable>
      );
    } else if (this.props.type === '이번달') {
      tables.push(
        <BootstrapTable data={tableDataSet} striped hover condensed options={ { noDataText: '데이터가 없습니다' } }>
          <TableHeaderColumn dataField="index" isKey>이탈 사유</TableHeaderColumn>
          <TableHeaderColumn dataField="ThisMonth">이번달 이탈</TableHeaderColumn>
          <TableHeaderColumn dataField="ThisPercentage">이번달 이탈률(%)</TableHeaderColumn>
        </BootstrapTable>
      );
    } else if (this.props.type === '지난달') {
      tables.push(
        <BootstrapTable data={tableDataSet} striped hover condensed options={ { noDataText: '데이터가 없습니다' } }>
          <TableHeaderColumn dataField="index" isKey>이탈 사유</TableHeaderColumn>
          <TableHeaderColumn dataField="LastMonth">지난달 이탈</TableHeaderColumn>
          <TableHeaderColumn dataField="LastPercentage">지난달 이탈률(%)</TableHeaderColumn>
        </BootstrapTable>
      );
    } else if (this.props.type === '이탈흐름분석') {
      tables.push(
        <BootstrapTable data={tableDataSet} striped hover condensed options={ { noDataText: '데이터가 없습니다' } }>
          <TableHeaderColumn dataField="Month" isKey>해당 월</TableHeaderColumn>
          <TableHeaderColumn dataField="Churns">이탈 수</TableHeaderColumn>
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

export default ChurnTable;
