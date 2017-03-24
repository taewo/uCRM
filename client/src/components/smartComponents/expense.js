import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { PageHeader, NavItem, Modal, Dropdown, Input, ButtonToolbar, Button } from 'react-bootstrap';
import { commafy } from '../../config';
import AddExpense from './addExpense';
import * as expenseActions from '../../actions/expenseActions';

class Expense extends Component {

  constructor(props) {
    super(props);

    this.open = this.open.bind(this);
    // this.delete = this.delete.bind(this);
    this.closeModal = this.closeModal.bind(this);
    // this.handleRowSelect = this.handleRowSelect.bind(this);
    this.state = {
      showModal: false,
    };
  }

  componentDidMount() {
    this.props.expenseShow();
  }

  open() {
    this.setState({
      showModal: true,
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
    });
  }

  render() {
    const {
      expenses,
    } = this.props;
    // console.log(11, expenses);
    const result = [];
    for (let i = 0; i < expenses.length; i += 1) {
      if (expenses[i].payment_date) {
        const expenseDate = expenses[i].payment_date.substring(2, 10);
        const expenseAmount = commafy(expenses[i].amount);
        const data = Object.assign({}, expenses[i], {
          payment_date: expenseDate,
          amount: expenseAmount,
        });
        result.push(data);
      }
    }
    // console.log(999, result);
    const cellEditProp = {
      mode: 'click',
      blurToSave: true,
    };

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,  // click to select, default is false
      clickToExpand: true,  // click to expand row, default is false
      // selected: this.props.selectedOrganizations,
      // onSelect: this.handleRowSelect,
    };
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
      <div className="Expense">
        <PageHeader className="expense_header">
          <mediam>
            지출현황
          </mediam>
        </PageHeader>

        <div>
          <ButtonToolbar className="expense_buttonToolbar">
            <Button
              bsStyle="primary"
              onClick={this.open}
            >
              Add
            </Button>
            <Button
              bsStyle="warning"
            >
              Modify
            </Button>
            <Button
              bsStyle="danger"
              onClick={this.delete}
            >
              Delete
            </Button>
          </ButtonToolbar>
        </div>
        <div>
          <BootstrapTable
            data={result}
            pagination
            striped
            search
            exportCSV
            selectRow={selectRow}
          >
            <TableHeaderColumn dataField="amount" isKey dataSort>금액</TableHeaderColumn>
            <TableHeaderColumn dataField="payment_date" dataSort>날짜</TableHeaderColumn>
            <TableHeaderColumn dataField="payment_method" dataSort>결제방법</TableHeaderColumn>
            <TableHeaderColumn dataField="type" dataSort>분류</TableHeaderColumn>
            <TableHeaderColumn dataField="details" dataSort>내역</TableHeaderColumn>
          </BootstrapTable>
        </div>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header>
            <Modal.Title>Add Expense</Modal.Title>
            <AddExpense closeModal={this.closeModal} />
          </Modal.Header>
        </Modal>
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
