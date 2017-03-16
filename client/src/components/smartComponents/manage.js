import React, { Component, PropTypes } from 'react';
import { MiddlebarDashboard, MiddlebarMembers, MiddlebarInvoices, MiddlebarRoom, MiddlebarLead } from '../dummyComponents/onManage';

const propTypes = {
};

const defaultProps = {
};

class Manage extends Component {
  constructor(props) {
    super(props);
  }
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
Manage.propTypes = propTypes;
Manage.defaultProps = defaultProps;

export default Manage;
