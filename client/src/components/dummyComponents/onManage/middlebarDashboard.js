import React, { Component } from 'react';
import { Link } from 'react-router';

class MiddlebarDashboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Link to={'/admin/manage/dashboard'}>
          Dashboard
        </Link>
      </div>
    );
  }
}

export default MiddlebarDashboard;
