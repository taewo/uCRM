import React, { Component, PropTypes } from 'react';

import SignUp from './sign/signUp';

const propTypes = {
};

const defaultProps = {
};

class Sign extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SignUp />
    );
  }
}
Sign.propTypes = propTypes;
Sign.defaultProps = defaultProps;

export default Sign;
