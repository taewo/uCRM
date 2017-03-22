import React, { Component } from 'react';
import { Route, RouteHandler, Link } from 'react-router';

import { Button, Nav, Navbar, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import SignUp from './signUp';
import LogOut from './logOut';
import LogIn from './logIn';

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
              <LogIn />
              <LogOut />
              <SignUp />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {this.props.children}
      </div>
    );
  }
}

export default Headers;
