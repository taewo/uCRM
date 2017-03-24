import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { PageHeader, NavItem, Modal, Dropdown, Input, ButtonToolbar, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as basicActions from '../../actions/basicActions';
import '../../../public/style.css';

class Basic extends Component {

  componentDidMount() {
    this.props.basicShow();
    console.log(1);
  }
  render() {
    const {
      basicData,
    } = this.props;
    if (!basicData) {
      return (
        <div />
      );
    }
    console.log(999, basicData);
    const basicName = basicData[0].name;
    const dataArr = [basicData[1]];
    console.log(basicName);
    return (
      <div className="Basic">
        <PageHeader className="basic_header">
          <mediam>
            사용자 : {basicName}
          </mediam>
        </PageHeader>
        <BootstrapTable data={dataArr} striped>
          <TableHeaderColumn dataField="name" isKey>공간이름</TableHeaderColumn>
          <TableHeaderColumn dataField="address">주소</TableHeaderColumn>
          <TableHeaderColumn dataField="max_desks">최대인원</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  basicData: state.basicReducer.data,
});

const mapDispatchToProps = dispatch => ({
  basicShow: () => { dispatch(basicActions.basicShow()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Basic);
