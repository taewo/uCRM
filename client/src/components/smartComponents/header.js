import React, { Component } from 'react';
import ButtonSignUp from '../dummyComponents/onHeader/buttonSignUp';
import ButtonLogIn from '../dummyComponents/onHeader/buttonLogIn';
import LogOut from './logOut';

class Header extends Component {
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

export default Header;
