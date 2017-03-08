import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Email, Mobile, Name, Password, Userid, Companyname, Submit } from '../dummyComponents/onSignUp';
import * as signUpActions from '../../actions/signUpActions';

// const propTypes = {
//   signUpEmailOnChange: PropTypes.func,
// };
//
// const defaultProps = {
//   signUpEmailOnChange: () => {console.log('입력을 기다린다.')},
// };

class SignUp extends Component {
  render() {
    return (
      <div>
        SignUp
        <Email signUpEmail={this.props.signUpEmailOnChange} />
        <Mobile signUpMobile={this.props.signUpMobileOnChange} />
        <Name signUpName={this.props.signUpNameOnChange} />
        <Password signUpPassword={this.props.signUpPasswordOnChange} />
        <Userid signUpUserid={this.props.signUpUseridOnChange} />
        <Companyname signUpCompanyname={this.props.signUpCompanynameOnChange} />
        <Submit signUpSubmit={this.props.signUpSubmitOnCange} />
      </div>
    );
  }
}
// SignUp.propTypes = propTypes;
// SignUp.defaultProps = defaultProps;
//
const mapStateToProps = state => ({
  toggleSignedUp: state.signUpReducer.toggleSignedUp,
});

const mapDispatchToProps = dispatch => ({
  signUpEmailOnChange: (email) => { dispatch(signUpActions.signUpEmail(email)); },
  signUpMobileOnChange: (mobile) => { dispatch(signUpActions.signUpMobile(mobile)); },
  signUpNameOnChange: (name) => { dispatch(signUpActions.signUpName(name)); },
  signUpPasswordOnChange: (password) => { dispatch(signUpActions.signUpPassword(password)); },
  signUpUseridOnChange: (userid) => { dispatch(signUpActions.signUpUserid(userid)); },
  signUpCompanynameOnChange: (companyname) => { dispatch(signUpActions.signUpCompanyname(companyname)); },
  signUpSubmitOnCange: () => { dispatch(signUpActions.signUpSubmit()); },
});

export default connect(null, mapDispatchToProps)(SignUp);
