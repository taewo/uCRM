import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as spaceActions from '../../actions/spaceActions';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

class Space extends Component {
  componentWillMount() {
    console.log('will mount');
    this.props.spaceShow();
  }

  render() {
    if(!this.props.spaceData) {
      return (
        <div>
          fail
        </div>
      )
    } else {
      const dataArr = [];
      this.props.spaceData.map((data, i) => {
        const dataObj = {};
        dataObj.address = data.address;
        dataObj.name = data.name;
        dataObj.max_desks = data.max_desks;
        dataArr.push(dataObj);
      })
      return (
        <div>
          <h3>공간</h3>
          <br />
            <BootstrapTable data={dataArr} >
              <TableHeaderColumn dataField='name' isKey>공간</TableHeaderColumn>
              <TableHeaderColumn dataField='address'>장소</TableHeaderColumn>
              <TableHeaderColumn dataField='max_desks'>최대인원</TableHeaderColumn>
            </BootstrapTable>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  spaceData: state.spaceReducer.data,
});

const mapDispatchToProps = dispatch => ({
  spaceShow: () => { dispatch(spaceActions.spaceShow()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Space);
