import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as billPlanActions from '../../actions/billPlanActions';

class BillPlan extends Component {
  componentWillMount() {
    console.log('will mount');
    this.props.billPlanShow();
  }
  render() {
    console.log('billplan data', this.props.billPlanData);
    const billPlanList = this.props.billPlanData ?
    this.props.billPlanData.map((billPlanData, i) => {
      return (
        <div key={i}>
          가격 : {billPlanData.cost} <br />
          기간 :  {billPlanData.duration} <br />
          이름 : {billPlanData.name} <br /><br />
        </div>
      );
    })
    : 'default';
    return (
      <div>
        BillPlan<br />
        <Link to={'/admin/setting/billplan/add'}>
          AddBillPlan
        </Link>
        {billPlanList}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  billPlanData : state.billPlanReducer.data,
});

const mapDispatchToProps = dispatch => ({
  billPlanShow: () => { dispatch(billPlanActions.billPlanShow()); },
});


export default connect(mapStateToProps, mapDispatchToProps)(BillPlan);
