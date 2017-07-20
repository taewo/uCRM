import React, { Component } from 'react';
import { Link } from 'react-router';

class MiddlebarChurn extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Link to={'/admin/report/churn'}>
          MiddlebarChurn
        </Link>
      </div>
    );
  }
}

export default MiddlebarChurn;
