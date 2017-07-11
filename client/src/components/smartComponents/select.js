import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { NavItem, Modal, Button } from 'react-bootstrap';

import * as dashboardActions from '../../actions/dashboardActions';

class Select extends Component {
  constructor(props) {
    super(props);

    this.open = this.open.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.SelectSpace = this.SelectSpace.bind(this);
    this.state = {
      showModal: false,
    };
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

  SelectSpace() {
    const data = JSON.parse(sessionStorage.getItem('userSpaceList'));
    if (!data) {
      return console.log('시작');
    }
    const showId = data.map((spaceData, i) => {
      return (
        <Button
          key={`space-${i}`}
          onClick={() => {
            sessionStorage.setItem('userSpaceListId', spaceData.space_id);
            this.props.dashboardShow();
            browserHistory.push('/admin/manage/dashboard');
            this.closeModal();
          }}
        >
        select: {spaceData.name}
        </Button>
      );
    });

    return (
      <Modal show={this.state.showModal} onHide={this.closeModal}>
        {showId}
      </Modal>
    );
  }

  render() {
    return (
      <NavItem eventKey={2} onClick={this.open}>
        Select
        {this.SelectSpace()}
      </NavItem>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dashboardShow: () => dispatch(dashboardActions.dashboardShow()),
});


export default connect(null, mapDispatchToProps)(Select);
