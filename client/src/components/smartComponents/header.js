import React, { Component, PropTypes } from 'react';
import ButtonSignUp from '../dummyComponents/onHeader/buttonSignUp';
const propTypes = {
};

const defaultProps = {
};

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        Header
        <ButtonSignUp />
      </div>
    );
  }
}
Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
