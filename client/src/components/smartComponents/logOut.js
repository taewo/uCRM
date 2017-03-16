import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { API_URL } from '../../config';


class LogOut extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

    logout() {
      const instance = {
        headers: {
          token: localStorage.getItem('userToken'),
        },
      };
      axios.get(`${API_URL}/logout`,
       instance,
     )
    .then((res) => {
      console.log('res', res);
      browserHistory.push('/');
      localStorage.removeItem('userToken');
      localStorage.removeItem('userData');
      localStorage.removeItem('userSpaceList');
      localStorage.removeItem('userSpaceListId');
      localStorage.removeItem('userType');
    })
    .catch((err) => {
      console.log(err);
    });
    }

  render() {
    return (
      <button onClick={this.logout}>
        Logout
      </button>
    );
  }
}

export default LogOut;
