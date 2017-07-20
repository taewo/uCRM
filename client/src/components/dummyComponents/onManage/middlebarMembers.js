import React, { Component } from 'react';
import { Link } from 'react-router';

class MiddlebarMembers extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Link to={'/admin/manage/members'}>
          Members
        </Link>
      </div>
    );
  }
}

export default MiddlebarMembers;
