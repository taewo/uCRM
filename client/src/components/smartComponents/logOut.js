import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { Button, Menu } from 'semantic-ui-react';
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
      <Menu.Item onClick={this.logout}>
        Logout
      </Menu.Item>
    );
  }
}

export default LogOut;
