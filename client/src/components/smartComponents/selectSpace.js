import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class SelectSpace extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = JSON.parse(sessionStorage.getItem('userSpaceList'));
    const showId = data.map((data) => {
      return <div
        onClick={() => {
          sessionStorage.setItem('userSpaceListId', data.space_id);
          browserHistory.push('/admin/manage/dashboard');
        }}
      >
        select: {data.name}
      </div>;
    });

    return (
      <div>{showId}</div>
    );
  }
}

export default SelectSpace;
