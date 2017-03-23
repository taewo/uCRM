import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { PageHeader, NavItem, Modal, Dropdown, Input, ButtonToolbar, Button } from 'react-bootstrap';

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
            Expense
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
            data={expenses}
            pagination
            striped
            search
            exportCSV
            selectRow={selectRow}
          >
            <TableHeaderColumn dataField="amount" isKey dataSort>amount</TableHeaderColumn>
            <TableHeaderColumn dataField="payment_date" dataSort>payment_date</TableHeaderColumn>
            <TableHeaderColumn dataField="payment_method" dataSort>payment_method</TableHeaderColumn>
            <TableHeaderColumn dataField="type" dataSort>type</TableHeaderColumn>
            <TableHeaderColumn dataField="details" dataSort>details</TableHeaderColumn>
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
