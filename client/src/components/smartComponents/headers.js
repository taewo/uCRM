import React, { Component } from 'react';
import { Image, Header, Menu } from 'semantic-ui-react';

import ButtonSignUp from '../dummyComponents/onHeader/buttonSignUp';
import ButtonLogIn from '../dummyComponents/onHeader/buttonLogIn';
import ButtonHome from '../dummyComponents/onHeader/buttonHome';
import LogOut from './logOut';

const CrmImg = require('../../../image/CRM_c.svg');

const HeadersStyle = {
  height: '100%',
};
const CrmImgStyle = {
  width: '4px',
};

class Headers extends Component {
  render() {
    return (
      <div className="Headers" style={HeadersStyle}>
        <Menu fluid>
          <Header as="h1">uCrm</Header>
          <Menu.Menu position="right">
            <ButtonSignUp />
            <ButtonLogIn />
            <LogOut />
            <ButtonHome />
          </Menu.Menu>
        </Menu>

        {this.props.children}
      </div>
    );
  }
}

export default Headers;
