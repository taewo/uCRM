import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Email from '../../dummyComponents/onSignUp/email';
import * as signUpActions from '../../../actions/signUpActions';
import Submit from '../../dummyComponents/onSignUp/submit';
// const propTypes = {
//   signUpEmailOnChange: PropTypes.func,
// };
//
// const defaultProps = {
//   signUpEmailOnChange: () => {console.log('입력을 기다린다.')},
// };

class SignUp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        SignUp
        <Email signUpEmail={this.props.signUpEmailOnChange} />
        <Submit signUpSubmit={this.props.signUpSubmitOnCange} />
      </div>
    );
  }
}
// SignUp.propTypes = propTypes;
// SignUp.defaultProps = defaultProps;

const mapStateToProps = state => ({
  toggleSignedIn: state.signUpReducer.toggleSignedIn,
});

const mapDispatchToProps = dispatch => ({
  signUpEmailOnChange: (email) => { dispatch(signUpActions.signUpEmail(email)); },
  signUpSubmitOnCange: () => { dispatch(signUpActions.signUpSubmit()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
