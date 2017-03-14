import React, { Component, PropTypes } from 'react';
import ButtonSignUp from '../dummyComponents/onHeader/buttonSignUp';
import ButtonLogIn from '../dummyComponents/onHeader/buttonLogIn';
import LogOut from './logOut';
import styles from '../../../public/style.css';

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
      <div className="Header">
        Header
        <ButtonSignUp />
        <ButtonLogIn />
        <LogOut />
        {this.props.children}
      </div>
    );
  }
}
Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
