import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { PageHeader, NavItem, Modal, Dropdown, Input, ButtonToolbar, Button } from 'react-bootstrap';

import AddLead from './addLead';
import * as leadActions from '../../actions/leadActions';

class Lead extends Component {

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
    this.props.leadShow();
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
    //
    // const leadDataList = this.props.leadData ?
    // this.props.leadData.map((listData, i) => {
    //   const subStringDate = listData.date.substring(5, 10);
    //   const modifyDate = subStringDate.replace('-', '월') + '일';
    //   return (
    //     <div key={i}>
    //       {modifyDate}, {listData.name}님께서 {listData.type}로 연락 및 방문 하셨습니다.
    //     </div>
    //   )
    // })
    // : 'default';
    const {
      leads,
    } = this.props;
    let result = [];
    for(let i = 0; i < leads.length; i += 1 ) {
      if(leads[i].date) {
        const leadDate = leads[i].date.substring(2, 10);
        const data = Object.assign({}, leads[i], {
          date: leadDate,
        });
        result.push(data);
      }
    }

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

    return (
      <div className="Lead">
        <PageHeader className="lead_header">
          <mediam>
            잠재고객
          </mediam>
        </PageHeader>

        <div>
          <ButtonToolbar className="lead_buttonToolbar">
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
            <TableHeaderColumn dataField="name" isKey dataSort>이름</TableHeaderColumn>
            <TableHeaderColumn dataField="date" dataSort>방문일/문의일</TableHeaderColumn>
            <TableHeaderColumn dataField="mobile" dataSort>휴대폰</TableHeaderColumn>
            <TableHeaderColumn dataField="email" dataSort>이메일</TableHeaderColumn>
            <TableHeaderColumn dataField="type" dataSort>문의방법</TableHeaderColumn>
            <TableHeaderColumn dataField="note" dataSort>비고</TableHeaderColumn>
          </BootstrapTable>
        </div>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header>
            <Modal.Title>Add Member</Modal.Title>
            <AddLead closeModal={this.closeModal} leadShow={this.props.leadShow}/>
          </Modal.Header>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  leads: state.leadReducer.leads,
});

const mapDispatchToProps = dispatch => ({
  leadShow: () => { dispatch(leadActions.leadShow()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Lead);
