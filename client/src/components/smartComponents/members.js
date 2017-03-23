import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { PageHeader, NavItem, Modal, Dropdown, Input, ButtonToolbar, Button } from 'react-bootstrap';
import axios from 'axios';

import AddMembers from './addMembers';
import * as membersActions from '../../actions/membersActions';


class Members extends Component {

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
    this.props.membersShow();
  }

  open() {
    this.setState({
      showModal: true,
    });
  }
  // TODO
  // delete 완성할것 !!!

  // delete() {
  //
  //   return
  // }

  closeModal() {
    this.setState({
      showModal: false,
    });
  }

  // handleRowSelect(row, isSelected, e) {
  //   if (isSelected) {
  //      this.props.selectOrganization(row.name);
  //  } else {
  //      // delete from selectedRow array if unselected
  //      this.props.unSelectOrganization(row._id);
  //  }
  //  return false;
  // }

  render() {
    const {
      members,
    } = this.props;
    console.log(this.props.members);

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
    // ['rgba(51, 102, 204, 1)', 'rgba(220, 57, 18, 1)', 'rgba(255, 153, 0, 1)', 'rgba(16, 150, 24, 1)', 'rgba(153, 0, 153, 1)',
    //   'rgba(59, 62, 172, 1)', 'rgba(0, 153, 198, 1)', 'rgba(221, 68, 119, 1)', 'rgba(102, 170, 0, 1)', 'rgba(184, 46, 46, 1)',
    //   'rgba(49, 99, 149, 1)', 'rgba(153, 68, 153, 1)', 'rgba(34, 170, 153, 1)', 'rgba(170, 170, 17, 1)', 'rgba(102, 51, 204, 1)',
    //   'rgba(230, 115, 0, 1)', 'rgba(139, 7, 7, 1)', 'rgba(50, 146, 98, 1)', 'rgba(85, 116, 166, 1)', 'rgba(59, 62, 172, 1)']
    //
    return (
      <div className="Member">
        <PageHeader className="member_header">
          <mediam>
            Members
          </mediam>
        </PageHeader>

        <div>
          <ButtonToolbar className="member_buttonToolbar">
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
            data={members}
            pagination
            striped
            search
            exportCSV
            selectRow={selectRow}
          >
            <TableHeaderColumn dataField="name" isKey dataSort>name</TableHeaderColumn>
            <TableHeaderColumn dataField="joined_date" dataSort>joined_date</TableHeaderColumn>
            <TableHeaderColumn dataField="end_date" dataSort>end_date</TableHeaderColumn>
            <TableHeaderColumn dataField="end_reason" dataSort>end_reason</TableHeaderColumn>
            <TableHeaderColumn dataField="mobile" dataSort>mobile</TableHeaderColumn>
            <TableHeaderColumn dataField="email" dataSort>email</TableHeaderColumn>
            <TableHeaderColumn dataField="gender" dataSort>gender</TableHeaderColumn>
          </BootstrapTable>
        </div>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header>
            <Modal.Title>Add Member</Modal.Title>
            <AddMembers closeModal={this.closeModal} />
          </Modal.Header>
        </Modal>
      </div>

    );
  }
}

const mapStateToProps = state => ({
  members: state.membersReducer.members,
});

const mapDispatchToProps = dispatch => ({
  membersShow: () => { dispatch(membersActions.membersShow()); },

});

export default connect(mapStateToProps, mapDispatchToProps)(Members);
