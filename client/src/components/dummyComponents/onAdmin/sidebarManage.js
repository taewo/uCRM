import React, { Component } from 'react';
import { Link } from 'react-router';

class SidebarManage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Link to={'/admin/manage/dashboard'}>
          Manage
        </Link>
      </div>

    );
  }
}

export default SidebarManage;
