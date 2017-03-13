import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';


class Room extends Component {
  render() {
    const roomInfo = 'Room'
    return (
      <div>
        <Link to={'/admin/manage/room/add'}>
          Add Room
        </Link>
        <br />
        {roomInfo}
      </div>
    );
  }
}

export default Room;
