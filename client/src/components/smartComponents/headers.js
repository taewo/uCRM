import React, { Component } from 'react';
import { Route, RouteHandler, Link } from 'react-router';

import { Button, Nav, Navbar, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SignUp from './signUp';
import LogOut from './logOut';
import LogIn from './logIn';
import Select from './select';
import Homes from './homes';
import SelectSpace from './selectSpace';

const CrmImg = require('../../../image/crm.svg');

const HeadersStyle = {
  height: '100%',
  background: 'gray',
};


class Headers extends Component {
  render() {
    if(sessionStorage.getItem('userToken')) {
      return (
        <div className="Headers" style={HeadersStyle}>
          <Navbar collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                uCrm
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <LinkContainer to="/">
                  <NavItem eventKey={1}>Home</NavItem>
                </LinkContainer>
                <Select />
                <LogOut />
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          {this.props.children}
        </div>
      )
    } else {
      return (
        <div className="Headers" style={HeadersStyle}>
          <Navbar collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                uCrm
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <LogIn />
                <SignUp />
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          {this.props.children}
        </div>
      )
    }
  }
}

export default Headers;
