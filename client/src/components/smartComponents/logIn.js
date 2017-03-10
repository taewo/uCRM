import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Userid, Password, Confirm } from '../dummyComponents/onLogIn';
import * as logInActions from '../../actions/logInActions';
const propTypes = {
};

const defaultProps = {
};

class Login extends Component {

  render() {
    return (
      <div>
        Login
        <Userid logInUserId={this.props.logInUseridOnChange} />
        <Password logInPassword={this.props.logInPasswordOnChange} />
        <Confirm logInConfirm={this.props.logInConfirmOnChange} />
      </div>
    );
  }
}

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

const mapStateToProps = state => ({
  toggleLogedIn: state.logInReducer.toggleLogedIn,
});

const mapDispatchToProps = dispatch => ({
  logInUseridOnChange: (userid) => { dispatch(logInActions.logInUserId(userid)); },
  logInPasswordOnChange: (password) => { dispatch(logInActions.logInPassword(password)); },
  logInConfirmOnChange: () => { dispatch(logInActions.logInConfirm()); },
});

export default connect(null, mapDispatchToProps)(Login);
