import React, { Component } from 'react';
import { Link } from 'react-router';

class Space extends Component {
  render() {
    return (
      <div>
        Space
        <br />
        <Link to={'/admin/setting/space/add'}>
          Add Space
        </Link>
      </div>
    );
  }
}

export default Space;
