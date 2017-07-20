import React, { Component } from 'react';
import { Link } from 'react-router';

class MiddlebarReportLead extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Link to={'/admin/report/lead'}>
          MiddlebarReportLead
        </Link>
      </div>
    );
  }
}

export default MiddlebarReportLead;
