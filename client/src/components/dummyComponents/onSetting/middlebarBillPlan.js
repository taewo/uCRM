import React, { Component } from 'react';
import { Link } from 'react-router';

class MiddlebarBillPlan extends Component {
  render() {
    return (
      <div>
        <Link to={'/admin/setting/billplan'}>
          MiddlebarBillPlan
        </Link>
      </div>
    );
  }
}

export default MiddlebarBillPlan;
