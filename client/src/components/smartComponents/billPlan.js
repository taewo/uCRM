import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as billPlanActions from '../../actions/billPlanActions';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { commafy } from '../../config';

class BillPlan extends Component {
  componentWillMount() {
    console.log('will mount');
    this.props.billPlanShow();
  }
  render() {
    if(!this.props.billPlanData) {
      return (
        <div>
          .
        </div>
      )
    } else {
      const dataArr = [];
      this.props.billPlanData.map((data, i) => {
        const dataObj = {};
        dataObj.cost = commafy(data.cost);
        dataObj.duration = `${data.duration}개월`
        dataObj.name = data.name;
        dataArr.push(dataObj);
      });
      return (
        <div>
          <h3>요금제</h3>
          <br />
          <BootstrapTable data={dataArr} striped>
            <TableHeaderColumn dataField='name' isKey>이름</TableHeaderColumn>
            <TableHeaderColumn dataField='cost'>가격</TableHeaderColumn>
            <TableHeaderColumn dataField='duration'>기간</TableHeaderColumn>
          </BootstrapTable>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  billPlanData : state.billPlanReducer.data,
});

const mapDispatchToProps = dispatch => ({
  billPlanShow: () => { dispatch(billPlanActions.billPlanShow()); },
});


export default connect(mapStateToProps, mapDispatchToProps)(BillPlan);
