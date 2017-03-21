import React, { Component } from 'react';
import { MiddlebarDashboard, MiddlebarMembers, MiddlebarLead } from '../dummyComponents/onManage';

class Manage extends Component {
  render() {
    return (
      <div className="Manage">
        <MiddlebarDashboard />
        <MiddlebarMembers />
        <MiddlebarLead />
        <br /><br />
        {this.props.children}
      </div>
    );
  }
}

export default Manage;
