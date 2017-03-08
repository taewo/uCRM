import React, { Component, PropTypes } from 'react';

const propTypes = {
  signUpPassword: PropTypes.string,
};

const defaultProps = {
  signUpPassword: null,
};

class Password extends Component {

  render() {
    return (
      <div>
        <input
          type="text" placeholder="Passoword" onChange={e => this.props.logInPassword(e.target.value)}
        />
      </div>
    );
  }
}
Password.propTypes = propTypes;
Password.defaultProps = defaultProps;

export default Password;
