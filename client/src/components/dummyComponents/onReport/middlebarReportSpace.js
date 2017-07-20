import React, { Component } from 'react';
import { Link } from 'react-router';

class MiddlebarReportSpace extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Link to={'/admin/report/space'}>
          MiddlebarReportSpace
        </Link>
      </div>
    );
  }
}

export default MiddlebarReportSpace;
