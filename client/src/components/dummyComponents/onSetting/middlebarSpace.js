import React, { Component } from 'react';
import { Link } from 'react-router';

class MiddlebarSpace extends Component {
  render() {
    return (
      <div>
        <Link to={'/admin/setting/space'}>
          MiddlebarSpace
        </Link>
      </div>
    );
  }
}

export default MiddlebarSpace;
