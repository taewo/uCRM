import React, { Component } from 'react';
import { Link } from 'react-router';

class MiddlebarRevenue extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Link to={'/admin/report/revenue'}>
          MiddlebarReportRevenue
        </Link>
      </div>
    );
  }
}

export default MiddlebarRevenue;
