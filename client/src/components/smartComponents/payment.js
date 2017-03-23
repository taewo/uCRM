import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { PageHeader, NavItem, Modal, Dropdown, Input, ButtonToolbar, Button } from 'react-bootstrap';
import axios from 'axios';

import AddPayment from './addPayment';
import * as paymentActions from '../../actions/paymentActions';

class Payment extends Component {

  constructor(props) {
    super(props);

    this.open = this.open.bind(this);
    this.delete = this.delete.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
    this.state = {
      showModal: false,
    };
  }

  componentDidMount() {
    this.props.paymentShow();
    console.log(this.props.payments);
  }

  handleRowSelect(row, isSelected, e) {
  if(isSelected) {
    const memberPayment = row.id
    this.props.paymentMemberId(memberPayment);
    console.log(memberPayment);
    return memberPayment;
    }
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

  delete() {
    const memberId = this.props.Id;
    const API_URL = 'http://localhost:4000/api';
    const instance = {
      headers: {
        token: sessionStorage.getItem('userToken'),
      },
    };
    return axios({
      method: 'delete',
      url: `${API_URL}/member/payment`,
      headers: instance.headers,
      data: {
        member_id: memberId,
      },
    });
  }

  render() {
    console.log(this.props.payments);
    const {
      payments,
    } = this.props;
    console.log(this.props.payments);

    const cellEditProp = {
      mode: 'click',
      blurToSave: true,
    };

    const selectRow = {
      mode: 'radio',
      clickToSelect: true,  // click to select, default is false
      clickToExpand: true,  // click to expand row, default is false
      onSelect: this.handleRowSelect,
      // selected: this.props.selectedOrganizations,
      // onSelect: this.handleRowSelect,
    };

    return (
      <div className="Payment">
        <PageHeader className="payment_header">
          <mediam>
            Payment
          </mediam>
        </PageHeader>

        <div>
          <ButtonToolbar className="payment_buttonToolbar">
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
            data={payments}
            pagination
            striped
            search
            exportCSV
            selectRow={selectRow}
          >
            <TableHeaderColumn dataField="member" isKey dataSort>member</TableHeaderColumn>
            <TableHeaderColumn dataField="start_date" dataSort>start_date</TableHeaderColumn>
            <TableHeaderColumn dataField="end_date" dataSort>end_date</TableHeaderColumn>
            <TableHeaderColumn dataField="billing_plan" dataSort>billing_plan</TableHeaderColumn>
          </BootstrapTable>
        </div>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header>
            <Modal.Title>Add Payment</Modal.Title>
            <AddPayment closeModal={this.closeModal} Id={this.props.Id} />
          </Modal.Header>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  payments: state.paymentReducer.payments,
  Id: state.paymentReducer.Id,
});

const mapDispatchToProps = dispatch => ({
  paymentShow: () => dispatch(paymentActions.paymentShow()),
  paymentMemberId: Id => dispatch(paymentActions.paymentMemberId(Id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
