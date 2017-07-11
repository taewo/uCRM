import React, { Component } from 'react';
import { connect } from 'react-redux';

import { NavItem, Modal, Dropdown, Input, ButtonToolbar, Button } from 'react-bootstrap';

import { Companyname, Email, Mobile, Name, Password, Userid } from '../dummyComponents/onSignUp';
import * as signUpActions from '../../actions/signUpActions';

class SignUp extends Component {

  constructor(props) {
    super(props);

    this.open = this.open.bind(this);
    this.closeModal = this.closeModal.bind(this);

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

  render() {
    return (
      <NavItem eventKey={2} onClick={this.open}>
        SignUp
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header>
            <Modal.Title>회원가입</Modal.Title>
            <Userid signUpUserid={this.props.signUpUserid} />
            <Password signUpPassword={this.props.signUpPassword} />
            <Name signUpName={this.props.signUpName} />
            <Companyname signUpCompanyname={this.props.signUpCompanyname} />
            <Mobile signUpMobile={this.props.signUpMobile} />
            <Email signUpEmail={this.props.signUpEmail} />
          </Modal.Header>
          <Modal.Footer>
            <Button onClick={() => {
              this.props.signUpSubmit();
              this.closeModal();
            }}>
            회원가입
            </Button>
          </Modal.Footer>
        </Modal>
      </NavItem>
    );
  }
}

const mapStateToProps = state => ({
  toggleSignedUp: state.signUpReducer.toggleSignedUp,
});

const mapDispatchToProps = dispatch => ({
  signUpEmail: email => dispatch(signUpActions.signUpEmail(email)),
  signUpMobile: mobile => dispatch(signUpActions.signUpMobile(mobile)),
  signUpName: name => dispatch(signUpActions.signUpName(name)),
  signUpPassword: password => dispatch(signUpActions.signUpPassword(password)),
  signUpUserid: userid => dispatch(signUpActions.signUpUserid(userid)),
  signUpCompanyname: companyname => dispatch(signUpActions.signUpCompanyname(companyname)),
  signUpSubmit: () => dispatch(signUpActions.signUpSubmit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
