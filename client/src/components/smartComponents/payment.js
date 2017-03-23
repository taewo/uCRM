import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import * as paymentActions from '../../actions/paymentActions';

class Payment extends Component {
  componentDidMount() {
    this.props.paymentShow();
  }

  render() {
    const {
      payments,
    } = this.props;
    // const memberList = this.props.members.map((member) => {
    //   const {
    //     email,
    //     end_date,
    //     end_reason,
    //     gender,
    //     joined_date,
    //     mobile,
    //     name,
    //   } = member;
    //   return (
    //     <div>
    //       이름: {name}
    //     </div>);
    // });
    return (
      <div>
        <Link to={'/admin/finance/payment/add'}>
          Add payment
        </Link>
        <br />
        <div>
          payment list
        </div>
        <div>
          <button onClick={this.handleBtnClick}>Sort Product Name</button>
          <BootstrapTable ref="table" data={payments}>
            <TableHeaderColumn dataField="type" isKey={true} dataSort={true}>type ID</TableHeaderColumn>
            <TableHeaderColumn dataField="details" dataSort={true}>details</TableHeaderColumn>
            <TableHeaderColumn dataField="amount" dataSort={true}>amount</TableHeaderColumn>
            <TableHeaderColumn dataField="payment_date" dataSort={true}>payment_date</TableHeaderColumn>
            <TableHeaderColumn dataField="payment_method" dataSort={true}>payment_method</TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  payments: state.paymentReducer.payments,
});

const mapDispatchToProps = dispatch => ({
  paymentShow: () => { dispatch(paymentActions.paymentShow()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
