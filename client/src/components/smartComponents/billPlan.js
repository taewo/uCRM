import React, { Component } from 'react';
import { Link } from 'react-router';


class BillPlan extends Component {
  render() {
    return (
      <div>
        BillPlan<br />
        <Link to={'/admin/setting/billplan/add'}>
          AddBillPlan
        </Link>
      </div>
    );
  }
}

export default BillPlan;
