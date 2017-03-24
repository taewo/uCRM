import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import ReportTable from './reportTable';

class RevenueTable extends ReportTable {

  transformData() {
    const dataset = [];
    if (this.props.data.length) {
      if (this.props.type === '이번달이익요약분석') {
        const delta = { Month: '전월 대비'};
        delta.revenues = this.getDelta(this.props.data[1].revenues, this.props.data[0].revenues);
        delta.expense = this.getDelta(this.props.data[1].expense, this.props.data[0].expense);
        delta.balance = this.getDelta(this.props.data[1].balance, this.props.data[0].balance);
        this.props.data.forEach((rows) => {
          rows.revenues = this.ToAccountingFormat(rows.revenues);
          rows.expense = this.ToAccountingFormat(rows.expense);
          rows.balance = this.ToAccountingFormat(rows.balance);
          dataset.push(rows);
        });
        dataset.push(delta);
      } else if (this.props.type === '이번달이익세부분석' || this.props.type === '요금제별연간이익분석') {
        let countSum = 0;
        let costSum = 0;
        let realCostSum = 0;
        this.props.data.forEach((rows) => {
          const newRow = Object.assign({}, rows);
          countSum += newRow.count
          costSum += newRow.cost;
          newRow.cost = this.ToAccountingFormat(newRow.cost);
          newRow.real_cost = Math.round(newRow.real_cost);
          realCostSum += newRow.real_cost;
          newRow.real_cost = this.ToAccountingFormat(newRow.real_cost);
          newRow.real_cost_percentage = Math.round(newRow.real_cost_percentage);
          newRow.cost_per_member = this.ToAccountingFormat(Math.round(newRow.cost_per_member));
          newRow.Month += '월';
          dataset.push(newRow);
        });
        const totalCostPerMember = Math.round(realCostSum / countSum);
        dataset.push({
          BillingPlan: '총합',
          count: countSum,
          cost: this.ToAccountingFormat(costSum),
          real_cost: this.ToAccountingFormat(realCostSum),
          real_cost_percentage: '-',
          cost_per_member: this.ToAccountingFormat(totalCostPerMember),
        });
      } else if (this.props.type === '이익흐름분석') {
        let revenuesSum = 0;
        let expenseSum = 0;
        let balanceSum = 0;
        this.props.data.forEach((rows) => {
          const newRow = Object.assign({}, rows);
          revenuesSum += newRow.revenues;
          expenseSum += newRow.expense;
          balanceSum += newRow.balance;
          newRow.revenues = this.ToAccountingFormat(newRow.revenues);
          newRow.expense = this.ToAccountingFormat(newRow.expense);
          newRow.balance = this.ToAccountingFormat(newRow.balance);
          newRow.Month += '월';
          dataset.push(newRow);
        });
        dataset.push({
          Month: '총합',
          revenues: this.ToAccountingFormat(revenuesSum),
          expense: this.ToAccountingFormat(expenseSum),
          balance: this.ToAccountingFormat(balanceSum),
        });
      }
    }
    return dataset;
  }


  render() {
    const tables = [];
    const tableDataSet = this.transformData();
    console.log(tableDataSet);
    if (this.props.type === '이번달이익요약분석') {
      tables.push(
        <BootstrapTable data={tableDataSet} striped hover condensed options={ { noDataText: '데이터를 추가해주세요!' } }>
          <TableHeaderColumn dataField="Month" isKey>기간</TableHeaderColumn>
          <TableHeaderColumn dataField="revenues">총수입</TableHeaderColumn>
          <TableHeaderColumn dataField="expense">총비용</TableHeaderColumn>
          <TableHeaderColumn dataField="balance">순수입</TableHeaderColumn>
        </BootstrapTable>
      );
    } else if (this.props.type === '이번달이익세부분석' || this.props.type === '요금제별연간이익분석') {
      tables.push(
        <BootstrapTable data={tableDataSet} striped hover condensed options={ { noDataText: '데이터를 추가해주세요!' } }>
          <TableHeaderColumn dataField="BillingPlan" isKey>요금제</TableHeaderColumn>
          <TableHeaderColumn dataField="count">회원 수</TableHeaderColumn>
          <TableHeaderColumn dataField="cost">총수입</TableHeaderColumn>
          <TableHeaderColumn dataField="real_cost">순이익</TableHeaderColumn>
          <TableHeaderColumn dataField="real_cost_percentage">총 순이익 대비(%)</TableHeaderColumn>
          <TableHeaderColumn dataField="cost_per_member">인당 순이익</TableHeaderColumn>
        </BootstrapTable>
      );
    } else if (this.props.type === '이익흐름분석') {
      tables.push(
        <BootstrapTable data={tableDataSet} striped hover condensed options={ { noDataText: '데이터를 추가해주세요!' } }>
          <TableHeaderColumn dataField="Month" isKey>해당 월</TableHeaderColumn>
          <TableHeaderColumn dataField="revenues">총수입</TableHeaderColumn>
          <TableHeaderColumn dataField="expense">총비용</TableHeaderColumn>
          <TableHeaderColumn dataField="balance">순이익</TableHeaderColumn>
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

export default RevenueTable;
