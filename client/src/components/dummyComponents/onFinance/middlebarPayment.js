import React, { Component } from 'react';
import { Link } from 'react-router';

class MiddlebarPayment extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Link to={'/admin/finance/payment'}>
          MiddlebarPayment
        </Link>
      </div>
    );
  }
}

export default MiddlebarPayment;
