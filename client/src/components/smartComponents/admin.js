import React, { Component } from 'react';
import SidebarManage from '../dummyComponents/onAdmin/sidebarManage';
import { tokenChecker } from '../../config';

class Admin extends Component {

  componentDidMount() {
    tokenChecker();
  }

  render() {
    return (
      <div className="Admin">
        <SidebarManage />
        {this.props.children}
      </div>
    );
  }
}


export default Admin;
