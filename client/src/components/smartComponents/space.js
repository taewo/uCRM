import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as spaceActions from '../../actions/spaceActions';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { PageHeader, NavItem, Modal, Dropdown, Input, ButtonToolbar, Button } from 'react-bootstrap';

import AddSpace from './addSpace';

class Space extends Component {

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
    this.props.spaceShow();
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
    if(!this.props.spaceData) {
      return (
        <div>
          .
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
        <div className="Space">
          <PageHeader className="space_header">
            <mediam>
              공간
            </mediam>
          </PageHeader>

          <div>
            <ButtonToolbar className="space_buttonToolbar">
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
              data={dataArr}
              pagination
              striped
              search
              exportCSV
            >
              <TableHeaderColumn dataField="name" isKey dataSort>공간이름</TableHeaderColumn>
              <TableHeaderColumn dataField="address" dataSort>주소</TableHeaderColumn>
              <TableHeaderColumn dataField="max_desks" dataSort>최대인원</TableHeaderColumn>
            </BootstrapTable>
          </div>
          <Modal show={this.state.showModal} onHide={this.closeModal}>
            <Modal.Header>
              <Modal.Title>Add Payment</Modal.Title>
              <AddSpace closeModal={this.closeModal} spaceShow={this.props.spaceShow} />
            </Modal.Header>
          </Modal>
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
