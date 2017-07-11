import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { NavItem, Modal, Dropdown, Input, ButtonToolbar, Button } from 'react-bootstrap';

class SelectSpace extends Component {
  constructor(props) {
    super(props);

    this.open = this.open.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openSpaceModal = this.openSpaceModal.bind(this);
    this.displaySpace = this.displaySpace.bind(this);

    this.state = {
      showModal: false,
      showSelectSpace: false,
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

  openSpaceModal() {
    this.setState({
      showSelectSpace: true,
    });
  }

  closeSpaceModal() {
    this.setState({
      showSelectSpace: false,
    });
  }

  displaySpace() {
    console.log(999);
    const data = JSON.parse(sessionStorage.getItem('userSpaceList'));
    if (!data) {
      return console.log('시작');
    }
    const showId = data.map((spaceData, i) => {
      console.log('middle');
      return (
        <Button
          key={`space-${i}`}
          onClick={() => {
            sessionStorage.setItem('userSpaceListId', spaceData.space_id);
            browserHistory.push('/admin/manage/dashboard');
            this.closeSpaceModal();
          }}
        >
        select: {spaceData.name}
        </Button>
      );
    });
    console.log(this.state.showSelectSpace)
    return (
      <Modal show={this.state.showSelectSpace} onHide={this.closeSpaceModal}>
        {showId}
      </Modal>
    );
  }

  render() {
    return (
      <NavItem eventKey={2} onClick={this.open}>
        space
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          {this.displaySpace()}
        </Modal>
      </NavItem>
    )
  }
}

export default SelectSpace;

/*
  // 이전코드

const data = JSON.parse(sessionStorage.getItem('userSpaceList'));
const showId = data.map((spaceData) => {
  return <button
    onClick={() => {
      sessionStorage.setItem('userSpaceListId', spaceData.space_id);
      browserHistory.push('/admin/manage/dashboard');
    }}
    >
    select: {spaceData.name}
  </button>;
});

return (
  <div>{showId}</div>
);
}

*/
