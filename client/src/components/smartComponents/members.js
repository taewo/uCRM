import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { PageHeader, NavItem, Modal, Dropdown, Input, ButtonToolbar, Button } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../../config';

import AddMembers from './addMembers';
import * as membersActions from '../../actions/membersActions';


class Members extends Component {

  constructor(props) {
    super(props);

    this.open = this.open.bind(this);
    this.deleteMember = this.deleteMember.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
    this.state = {
      showModal: false,
      showDeleteModal: false,
      endReason: null,
    };
  }

  componentDidMount() {
    this.props.membersShow();
  }

  handleRowSelect(row, isSelected, e) {
    if (isSelected) {
      const memberId = row.id
      this.props.memberId(memberId);
      return memberId;
    }
  }

  open() {
    this.setState({
      showModal: true,
    });
  }
  // TODO
  // delete 완성할것 !!!

  openDeleteModal() {
    this.setState({
      showDeleteModal: true,
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
    });
  }

  closeDeleteModal() {
    this.setState({
      showDeleteModal: false,
    });
  }

  deleteMember() {
    const memberId = this.props.Id;
    if (!memberId) {
      console.log('member come in')
    }

    const endResonAxios = () => {
      const endReason = this.state.endReason;
      const instance = {
        headers: {
          token: sessionStorage.getItem('userToken'),
        },
      };
      return axios({
        method: 'delete',
        url: `${API_URL}/member`,
        headers: instance.headers,
        data: {
          member_id: memberId,
          end_reason: endReason,
        },
      })
      .then((res) => {
        this.closeDeleteModal();
        this.props.membersShow();
        console.log(res);
      });
    };

    return (
      <Modal show={this.state.showDeleteModal} onHide={this.closeDeleteModal}>
        <Modal.Header>
          <Modal.Title>what is end_reason?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button onClick={()=>{this.setState({endReason:'이직'})}}>이직</Button>
          <Button onClick={(e)=>{this.setState({endReason:'이직'})}}>이전</Button>
          <Button onClick={(e)=>{this.setState({endReason:'이직'})}}>금전적사유</Button>
          <Button onClick={(e)=>{this.setState({endReason:'확장'})}}>확장</Button>
          <Button onClick={(e)=>{this.setState({endReason:'불만족'})}}>불만족</Button>
        </Modal.Body>
        <Modal.Footer>
         <Button
           onClick={endResonAxios}
          >
          Delete
        </Button>
       </Modal.Footer>
      </Modal>
    )
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
    console.log(members);
    let curruentMember = [];
    let outdatedMember = [];
    for (let i = 0; i < members.length; i += 1) {
      if (!members[i].end_date) {
        const joinDate = members[i].joined_date.substring(2, 10);
        const data = Object.assign({}, members[i], {
          joined_date: joinDate,
        });
        curruentMember.push(data)
      }
      else {
        const joinDate = members[i].joined_date.substring(2, 10);
        const endDate = members[i].end_date.substring(2, 10);
        const data = Object.assign({}, members[i], {
          joined_date: joinDate,
          end_date: endDate,
        });
        outdatedMember.push(data)
      }
    }

    const cellEditProp = {
      mode: 'click',
      blurToSave: true,
    };

    const selectRow = {
      mode: 'radio',
      clickToSelect: true,  // click to select, default is false
      clickToExpand: true,  // click to expand row, default is false
      // selected: this.props.selectedOrganizations,
      onSelect: this.handleRowSelect,
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
            현재 입주 멤버
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
              onClick={this.openDeleteModal}
            >
              Delete
            </Button>
          </ButtonToolbar>
        </div>
        <div>
          <BootstrapTable
            data={curruentMember}
            pagination
            striped
            search
            exportCSV
            selectRow={selectRow}
          >
            <TableHeaderColumn dataField="name" isKey dataSort>이름</TableHeaderColumn>
            <TableHeaderColumn dataField="joined_date" dataSort>입주일</TableHeaderColumn>
            <TableHeaderColumn dataField="mobile" dataSort>휴대폰</TableHeaderColumn>
            <TableHeaderColumn dataField="email" dataSort>이메일</TableHeaderColumn>
          </BootstrapTable>
        </div>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header>
            <Modal.Title>Add Member</Modal.Title>
            <AddMembers closeModal={this.closeModal} memberShow={this.props.membersShow} />
          </Modal.Header>
        </Modal>
        {this.deleteMember()}

        <PageHeader className="member_header">
          <mediam>
            계약 만료 멤버
          </mediam>
        </PageHeader>

        <div>
          <BootstrapTable
            data={outdatedMember}
            pagination
            striped
            search
            exportCSV
            selectRow={selectRow}
          >
            <TableHeaderColumn dataField="name" isKey dataSort>이름</TableHeaderColumn>
            <TableHeaderColumn dataField="joined_date" dataSort>입주일</TableHeaderColumn>
            <TableHeaderColumn dataField="mobile" dataSort>휴대폰</TableHeaderColumn>
            <TableHeaderColumn dataField="email" dataSort>이메일</TableHeaderColumn>
            <TableHeaderColumn dataField="end_date" dataSort>계약종료일</TableHeaderColumn>
            <TableHeaderColumn dataField="end_reason" dataSort>종료사유</TableHeaderColumn>
          </BootstrapTable>
        </div>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header>
            <Modal.Title>Add Member</Modal.Title>
            <AddMembers closeModal={this.closeModal} memberShow={this.props.membersShow} />
          </Modal.Header>
        </Modal>
        {this.deleteMember()}
      </div>

    );
  }
}

const mapStateToProps = state => ({
  members: state.membersReducer.members,
  Id: state.membersReducer.memberId,
});

const mapDispatchToProps = dispatch => ({
  membersShow: () => { dispatch(membersActions.membersShow()); },
  memberId: memberId => dispatch(membersActions.memberId(memberId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Members);
