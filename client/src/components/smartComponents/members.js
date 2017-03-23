import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import * as membersActions from '../../actions/membersActions';

class Members extends Component {
  componentDidMount() {
    this.props.membersShow();
  }

  render() {
    const {
      members,
    } = this.props;
    console.log(this.props.members);
    return (
      <div>
        <Link to={'/admin/manage/members/add'}>
          Add Member
        </Link>
        <br />
        <div>
          memberList
        </div>
        <div>
          <button onClick={ this.handleBtnClick }>Sort Product Name</button>
          <BootstrapTable ref='table' data={ members }>
            <TableHeaderColumn dataField='name' isKey={ true } dataSort={ true }>name ID</TableHeaderColumn>
            <TableHeaderColumn dataField='joined_date' dataSort={ true }>joined_date</TableHeaderColumn>
            <TableHeaderColumn dataField='end_date' dataSort={ true }>end_date</TableHeaderColumn>
            <TableHeaderColumn dataField='end_reason' dataSort={ true }>end_reason</TableHeaderColumn>
            <TableHeaderColumn dataField='mobile' dataSort={ true }>mobile</TableHeaderColumn>
            <TableHeaderColumn dataField='email' dataSort={ true }>email</TableHeaderColumn>
            <TableHeaderColumn dataField='gender' dataSort={ true }>gender</TableHeaderColumn>
          </BootstrapTable>
        </div>
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
