import React, { Component } from 'react';
import { Link } from 'react-router';

class SidebarSetting extends Component {
  render() {
    return (
      <div>
        <Link to={'/admin/setting/basic'}>
          SidebarSetting
        </Link>
      </div>
    );
  }
}

export default SidebarSetting;
