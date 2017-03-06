import React, { Component, PropTypes } from 'react';

const propTypes = {
  signUpEmail: PropTypes.string,
};

const defaultProps = {
  signUpEmail: null,
};

class Email extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <input
          type="text" placeholder="email" onChange={e => this.props.signUpEmail(e.target.value)}
        />
      </div>
    );
  }
}
Email.propTypes = propTypes;
Email.defaultProps = defaultProps;

export default Email;
