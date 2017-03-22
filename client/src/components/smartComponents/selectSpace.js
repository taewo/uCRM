import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class SelectSpace extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = JSON.parse(sessionStorage.getItem('userSpaceList'));
    const showId = data.map((spaceData) => {
      return <button
        onClick={() => {
          sessionStorage.setItem('userSpaceListId', spaceData.space_id);
          browserHistory.push('/admin/manage/dashboard');
        }}
      >
        select: {spaceData.name}
      </button>;
    });

    return (
      <div>{showId}</div>
    );
  }
}

export default SelectSpace;
