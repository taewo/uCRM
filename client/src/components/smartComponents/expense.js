import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


import * as expenseActions from '../../actions/expenseActions';

class Expense extends Component {
  componentDidMount() {
    this.props.expenseShow();
  }

  render() {
    const {
      expenses,
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
        <Link to={'/admin/finance/expense/add'}>
          Add expense
        </Link>
        <br />
        <div>
          expenseList
        </div>
        <div>
          <button onClick={this.handleBtnClick}>Sort Product Name</button>
          <BootstrapTable ref="table" data={expenses}>
            <TableHeaderColumn dataField="type" isKey={true} dataSort={true}>type ID</TableHeaderColumn>
            <TableHeaderColumn dataField="detail" dataSort={true}>detail</TableHeaderColumn>
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
  expenses: state.expenseReducer.expenses,
});

const mapDispatchToProps = dispatch => ({
  expenseShow: () => { dispatch(expenseActions.expenseShow()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Expense);
