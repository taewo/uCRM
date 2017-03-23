import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as basicActions from '../../actions/basicActions';
import '../../../public/style.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

class Basic extends Component {
  componentWillMount() {
    this.props.basicShow();
  }
  render() {
    if(!this.props.basicData) {
      return (
        <div>
          fail
        </div>
      );
    } else {
      const basicName = this.props.basicData[0].name;
      const dataArr = [];
      const obj = {};
      this.props.basicData.shift();
      this.props.basicData.map((data, i) => {
        obj.space = data.company_id;
        obj.name = data.name;
        obj.address = data.address;
      });
      dataArr.push(obj);
      return (
        <div>
          <h3>{basicName}</h3>
          <br />
          <BootstrapTable data={dataArr} >
            <TableHeaderColumn dataField='space' isKey>Space ID</TableHeaderColumn>
            <TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
            <TableHeaderColumn dataField='address'>Address</TableHeaderColumn>
          </BootstrapTable>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  basicData: state.basicReducer.data,
});

const mapDispatchToProps = dispatch => ({
  basicShow: () => { dispatch(basicActions.basicShow()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Basic);
