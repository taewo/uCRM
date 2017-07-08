import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as billPlanActions from '../../actions/billPlanActions';
import { PageHeader, NavItem, Modal, Dropdown, Input, ButtonToolbar, Button } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { commafy } from '../../config';
import AddBillplan from './addBillPlan';

class BillPlan extends Component {

  constructor(props) {
    super(props);
    this.open = this.open.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      showModal: false,
    };
  }

  componentDidMount() {
    console.log('will mount');
    this.props.billPlanShow();
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
    if(!this.props.billPlanData) {
      return (
        <div />
      );
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
        <div className="Billplan">
          <PageHeader className="billplan_header">
            <mediam>
              요금제
            </mediam>
          </PageHeader>

          <div>
            <ButtonToolbar className="billplan_buttonToolbar">
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

        {/*<button onClick={this.handleBtnClick}>Sort Product Name</button>
            <BootstrapTable ref="table" data={payments}>
              <TableHeaderColumn dataField="type" isKey={true} dataSort={true}>type ID</TableHeaderColumn>
              <TableHeaderColumn dataField="details" dataSort={true}>details</TableHeaderColumn>
              <TableHeaderColumn dataField="amount" dataSort={true}>amount</TableHeaderColumn>
              <TableHeaderColumn dataField="payment_date" dataSort={true}>payment_date</TableHeaderColumn>
              <TableHeaderColumn dataField="payment_method" dataSort={true}>payment_method</TableHeaderColumn>*/}

            <BootstrapTable
              data={dataArr}
              pagination
              striped
              search
              exportCSV
            >
              <TableHeaderColumn dataField="name" isKey dataSort>이름</TableHeaderColumn>
              <TableHeaderColumn dataField="cost" dataSort>가격</TableHeaderColumn>
              <TableHeaderColumn dataField="duration" dataSort>기간</TableHeaderColumn>

            </BootstrapTable>
          </div>
          <Modal show={this.state.showModal} onHide={this.closeModal}>
            <Modal.Header>
              <Modal.Title>Add Payment</Modal.Title>
              <AddBillplan closeModal={this.closeModal} billPlanShow={this.props.billPlanShow} />
            </Modal.Header>
          </Modal>
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
