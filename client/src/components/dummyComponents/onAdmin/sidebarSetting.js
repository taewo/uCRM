import React, { Component } from 'react';
import { Link } from 'react-router';

class SidebarSetting extends Component {
  render() {
    return (
      <div>
        <Link to={'/admin/setting/basic'}>
          Setting
        </Link>
      </div>
    );
  }
}

export default SidebarSetting;
