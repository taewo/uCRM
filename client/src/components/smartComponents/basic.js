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
      console.log(999, this.props.basicData)
      const basicName = this.props.basicData[0].name;
      const dataArr = [];
      const obj = {};
      this.props.basicData.shift();
      this.props.basicData.map((data, i) => {
        obj.name = data.name;
        obj.address = data.address;
        obj.max_desks = data.max_desks;
      });
      dataArr.push(obj);
      return (
        <div>
          <h3>{basicName}</h3>
          <br />
          <BootstrapTable data={dataArr} striped>
            <TableHeaderColumn dataField='name' isKey>공간이름</TableHeaderColumn>
            <TableHeaderColumn dataField='address'>주소</TableHeaderColumn>
            <TableHeaderColumn dataField='max_desks'>최대인원</TableHeaderColumn>
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
