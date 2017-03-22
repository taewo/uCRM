import React, { Component } from 'react';
import { Image, Header, Menu } from 'semantic-ui-react';

import ButtonSignUp from '../dummyComponents/onHeader/buttonSignUp';
import ButtonLogIn from '../dummyComponents/onHeader/buttonLogIn';
import LogOut from './logOut';

const CrmImg = require('../../../image/CRM_c.svg');

class Headers extends Component {
  render() {
    return (
      <div>
        <Menu fluid width="3">
          <Header as="h1">uCrm</Header>
          <Menu.Menu position="right">
            <ButtonSignUp />
            <ButtonLogIn />
            <LogOut />
          </Menu.Menu>
        </Menu>
        {this.props.children}
      </div>
    );
  }
}

export default Headers;
