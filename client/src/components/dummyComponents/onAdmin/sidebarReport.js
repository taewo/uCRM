import React, { Component } from 'react';
import { Link } from 'react-router';

class SidebarReport extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Link to={'/admin/report/churn'}>
          Report
        </Link>
      </div>
    );
  }
}

export default SidebarReport;
