import React, { Component } from 'react';
import SidebarManage from '../dummyComponents/onAdmin/sidebarManage';
import SidebarReport from '../dummyComponents/onAdmin/sidebarReport';
import SidebarSetting from '../dummyComponents/onAdmin/sidebarSetting';
import SidebarFinance from '../dummyComponents/onAdmin/sidebarFinance';

import { tokenChecker } from '../../config';

class Admin extends Component {

  componentDidMount() {
    tokenChecker();
  }

  render() {
    return (
      <div className="Admin">
        <SidebarManage />
        <SidebarReport />
        <SidebarSetting />
        <SidebarFinance />
        <br />
        <br />
        {this.props.children}
      </div>
    );
  }
}


export default Admin;
