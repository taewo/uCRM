import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class LeadTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      channel_mapper: {
        email: '이메일',
        phone: '전화 문의',
        tour: '직접 방문',
      },
    };
  }

  getDelta(thisData, lastData) {
    let delta = Math.round((thisData / lastData - 1) * 100);
    let change;
    if (!thisData || !lastData) {
      delta = 100;
    }
    if ((thisData - lastData) > 0) {
      change = delta + '% 증가';
    } else if ((thisData - lastData) < 0) {
      change = -delta + '% 감소';
    } else {
      change = '-';
    }
    return change;
  }

  transformData() {
    const dataset = [];
    if (this.props.type === '요약' || this.props.type === '채널별비교') {
      if (JSON.stringify(this.props.data) !== '{}') {
        let total = { Channels: '총합',
          ThisMonth: 0,
          ThisConversion: 0,
          ThisConversionPercentage: '-',
          LastMonth: 0,
          LastConversion: 0,
          LastConversionPercentage: '-',
          countchange: 0,
          conversionchange: 0,
          conversionratechange: 0,
        };
        this.props.data.forEach((rows) => {
          console.log(rows)
          const newRow = Object.assign({}, rows);
          total.ThisMonth += newRow.ThisMonth;
          total.LastMonth += newRow.LastMonth;
          total.ThisConversion += newRow.ThisMonth;
          total.LastConversion += newRow.LastMonth;
          newRow.countchange = this.getDelta(newRow.ThisMonth, newRow.LastMonth);
          newRow.conversionchange = this.getDelta(newRow.ThisConversion, newRow.LastConversion);
          newRow.conversionratechange = this.getDelta(newRow.ThisConversionPercentage, newRow.LastConversionPercentage);
          console.log(this.state.channel_mapper[newRow.Channels]);
          newRow.Channels = this.state.channel_mapper[newRow.Channels];
          console.log(newRow);
          dataset.push(newRow);
        });
        total.ThisConversionPercentage = Math.round((total.ThisConversion / total.ThisMonth) * 100)
        total.LastConversionPercentage = Math.round((total.LastConversion / total.LastMonth) * 100)
        total.countchange = this.getDelta(total.ThisMonth, total.LastMonth);
        total.conversionchange = this.getDelta(total.ThisConversion, total.LastConversion);
        total.conversionratechange = this.getDelta(total.ThisConversionPercentage, total.LastConversionPercentage);
        dataset.push(total);
      }
    } else if (this.props.type === '잠재고객흐름분석') {
      let leadSum = 0;
      let conversionSum = 0;
      this.props.data.forEach((rows) => {
        const newRow = Object.assign({}, rows);
        leadSum += rows.Leads;
        conversionSum += rows.ActualConversion;
        newRow.ConversionPercentage = Math.round(newRow.ConversionPercentage);
        newRow.Month += '월';
        dataset.push(newRow);
      });
      dataset.push({ Month: '총합', Leads: leadSum, ActualConversion: conversionSum, ConversionPercentage: '-' });
    }
    return dataset;
  }


  render() {
    const tables = [];
    const tableDataSet = this.transformData();
    console.log(tableDataSet);
    if (this.props.type === '채널별비교') {
      tables.push(
        <BootstrapTable data={tableDataSet} striped hover condensed options={ { noDataText: '데이터가 없습니다' } }>
          <TableHeaderColumn dataField="Channels" isKey>채널</TableHeaderColumn>
          <TableHeaderColumn dataField="ThisMonth">이번달 문의</TableHeaderColumn>
          <TableHeaderColumn dataField="LastMonth">지난달 문의</TableHeaderColumn>
          <TableHeaderColumn dataField="countchange">전월대비</TableHeaderColumn>
          <TableHeaderColumn dataField="ThisConversion">이번달 전환</TableHeaderColumn>
          <TableHeaderColumn dataField="LastConversion">지난달 전환</TableHeaderColumn>
          <TableHeaderColumn dataField="conversionchange">전월대비</TableHeaderColumn>
        </BootstrapTable>
      );
    } else if (this.props.type === '요약') {
      tables.push(
        <BootstrapTable data={tableDataSet} striped hover condensed options={ { noDataText: '데이터가 없습니다' } }>
          <TableHeaderColumn dataField="Channels" isKey>채널</TableHeaderColumn>
          <TableHeaderColumn dataField="ThisMonth">이번달 문의/방문</TableHeaderColumn>
          <TableHeaderColumn dataField="ThisConversion">이번달 전환</TableHeaderColumn>
          <TableHeaderColumn dataField="ThisConversionPercentage">전환률(%)</TableHeaderColumn>
        </BootstrapTable>
      );
    } else if (this.props.type === '잠재고객흐름분석') {
      tables.push(
        <BootstrapTable data={tableDataSet} striped hover condensed options={ { noDataText: '데이터가 없습니다' } }>
          <TableHeaderColumn dataField="Month" isKey>해당 월</TableHeaderColumn>
          <TableHeaderColumn dataField="Leads">잠재고객 문의/방문</TableHeaderColumn>
          <TableHeaderColumn dataField="ActualConversion">입주 전환</TableHeaderColumn>
          <TableHeaderColumn dataField="ConversionPercentage">입주 전환율(%)</TableHeaderColumn>
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

export default LeadTable;
