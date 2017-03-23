import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as billPlanActions from '../../actions/billPlanActions';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

class BillPlan extends Component {
  componentWillMount() {
    console.log('will mount');
    this.props.billPlanShow();
  }
  render() {
    if(!this.props.billPlanData) {
      return (
        <div>
          fail
        </div>
      )
    } else {
      const dataArr = [];
      this.props.billPlanData.map((data, i) => {
        const dataObj = {};
        dataObj.cost = data.cost;
        dataObj.duration = data.duration;
        dataObj.name = data.name;
        dataArr.push(dataObj);
      });
      return (
        <div>
          <h3>요금제</h3>
          <br />
          <BootstrapTable data={dataArr} >
            <TableHeaderColumn dataField='cost' isKey>가격</TableHeaderColumn>
            <TableHeaderColumn dataField='duration'>기간</TableHeaderColumn>
            <TableHeaderColumn dataField='name'>명칭</TableHeaderColumn>
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
