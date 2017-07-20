import React, { Component } from 'react';
import { Link } from 'react-router';

class MiddlebarExpense extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Link to={'/admin/finance/expense'}>
          MiddlebarExpense
        </Link>
      </div>
    );
  }
}

export default MiddlebarExpense;
