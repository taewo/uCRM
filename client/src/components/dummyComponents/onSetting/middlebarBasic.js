import React, { Component } from 'react';
import { Link } from 'react-router';

class MiddlebarBasic extends Component {
  render() {
    return (
      <div>
        <Link to={'/admin/setting/basic'}>
          MiddlebarBasic
        </Link>
      </div>
    );
  }
}

export default MiddlebarBasic;
