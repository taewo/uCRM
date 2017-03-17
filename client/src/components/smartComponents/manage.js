import React, { Component, PropTypes } from 'react';
import { MiddlebarDashboard, MiddlebarMembers, MiddlebarInvoices, MiddlebarRoom, MiddlebarLead } from '../dummyComponents/onManage';

class Manage extends Component {
  render() {
    return (
      <div className="Manage">
        <MiddlebarDashboard />
        <MiddlebarMembers />
        <MiddlebarInvoices />
        <MiddlebarRoom />
        <MiddlebarLead />
        <br /><br />
        {this.props.children}
      </div>
    );
  }
}

export default Manage;
