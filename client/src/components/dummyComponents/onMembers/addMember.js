import React, { Component } from 'react';
import { Link } from 'react-router';

class AddMember extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Link to={'/admin/manage/members/add'}>
          AddMember
        </Link>
      </div>
    );
  }
}

export default AddMember;
