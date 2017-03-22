import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { API_URL } from '../../config';


class LogOut extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    const instance = {
      headers: {
        token: sessionStorage.getItem('userToken'),
      },
    };
    axios.get(`${API_URL}/logout`,
     instance,
     )
    .then((res) => {
      console.log('res', res);
      browserHistory.push('/');
      sessionStorage.removeItem('userToken');
      sessionStorage.removeItem('userData');
      sessionStorage.removeItem('userSpaceList');
      sessionStorage.removeItem('userSpaceListId');
      sessionStorage.removeItem('userCompanyId');
      sessionStorage.removeItem('userType');
    })
    .catch((err) => {
      console.log(err);
    });
    }

  render() {
    return (
      <LinkContainer to="/">
        <NavItem eventKey={3} onClick={this.logout}>Logout</NavItem>
      </LinkContainer>
    );
  }
}

export default LogOut;
