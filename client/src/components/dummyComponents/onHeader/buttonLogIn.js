import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
};

const defaultProps = {
};

class ButtonLogIn extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button>
        <Link to={'/login'}>login</Link>
      </button>
    );
  }
}
ButtonLogIn.propTypes = propTypes;
ButtonLogIn.defaultProps = defaultProps;

export default ButtonLogIn;
