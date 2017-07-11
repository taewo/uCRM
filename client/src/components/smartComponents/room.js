import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import { API_URL } from '../../config';

class Room extends Component {

  constructor(props) {
    super(props);
    // this.getRoom = this.getRoom.bind(this);
  }

  // getRoom() {
  //   axios.get(`${API_URL}/room`)
  //   .then((res) => {
  //     console.log(res);
  //   });
  // }
  //
  // componentWillMoount() {
  //   this.getRoom();
  // }
  // axios.get(`${API_URL}/logout`,
  //    instance,
  //  )
  // .then((res) => {
  //   console.log('res', res);
  //   browserHistory.push('/');
  //   sessionStorage.removeItem('userToken');
  // })
  // .catch((err) => {
  //   console.log(err);
  // });
  // }

  render() {
    return (
      <div>
        <Link to={'/admin/manage/room/add'}>
          Add Room
        </Link>
        <br />
        <li>
          {this.getRoom}
        </li>
      </div>
    );
  }
}

export default Room;
