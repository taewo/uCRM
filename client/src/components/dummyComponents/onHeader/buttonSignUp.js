import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
};

const defaultProps = {
};

class ButtonSignUp extends Component {
  render() {
    return (
        <button>
          <Link to={'/signup'}>signup</Link>
        </button>
    );
  }
}
ButtonSignUp.propTypes = propTypes;
ButtonSignUp.defaultProps = defaultProps;

export default ButtonSignUp;
