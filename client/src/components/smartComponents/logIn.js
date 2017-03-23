import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { NavItem, Modal, Dropdown, Input, ButtonToolbar, Button } from 'react-bootstrap';

import { Userid, Password } from '../dummyComponents/onLogIn';
import * as logInActions from '../../actions/logInActions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.open = this.open.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openSpaceModal = this.openSpaceModal.bind(this);
    this.SelectSpace = this.SelectSpace.bind(this);

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
        Login
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header>
            <Modal.Title>Login</Modal.Title>
            <Userid logInUserId={this.props.logInUserId} />
            <Password logInPassword={this.props.logInPassword} />
          </Modal.Header>
          <Modal.Footer>
            <Button onClick={() => {
              this.props.logInConfirm().then((res) => {
                this.closeModal();
                if (res === 'hasSpaceList') {
                  this.openSpaceModal();
                }
                 /*
                    TODO
                    spaceList를 가질때랑 안가질때를 구분해서 state에 저장하려고 했는데,
                    안가지고 있을 때에는 바로 지워지지가 않아서
                    안가지고 있을 때에 loginaction에서 browser push 로 처리해 버렸음
                    리펙터링 필요!!

                    TODO
                    spaceList가 없을 때 add space로 Modal 이동하는 것 만들자
                */
              });
            }}
            >
            확인
            </Button>
          </Modal.Footer>
        </Modal>
        {this.SelectSpace()}
      </NavItem>
    );
  }
}

const mapStateToProps = state => ({
  toggleLogedIn: state.logInReducer.toggleLogedIn,
  userid: state.logInReducer.userid,
  password: state.logInReducer.password,
});

const mapDispatchToProps = dispatch => ({
  logInUserId: userid => dispatch(logInActions.logInUserId(userid)),
  logInPassword: password => dispatch(logInActions.logInPassword(password)),
  logInConfirm: () => dispatch(logInActions.logInConfirm()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);
