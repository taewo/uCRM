import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { PageHeader, NavItem, Modal, Dropdown, Input, ButtonToolbar, Button } from 'react-bootstrap';

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
    console.log('will mount');
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
    const leadDataList = this.props.leadData ?
    this.props.leadData.map((listData, i) => {
      const subStringDate = listData.date.substring(5, 10);
      const modifyDate = subStringDate.replace('-', '월') + '일';
      return (
        <div key={i}>
          {modifyDate}, {listData.name}님께서 {listData.type}로 연락 및 방문 하셨습니다.
        </div>
      )
    })
    : 'default';
    return (
      <div>
        Lead page<br />
        <Link to={`/admin/manage/lead/add`}>
          addLead
        </Link>
        <br />
        <br />
        {leadDataList}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  leadData: state.leadReducer.data,
});

const mapDispatchToProps = dispatch => ({
  leadShow: () => { dispatch(leadActions.leadShow()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Lead);
