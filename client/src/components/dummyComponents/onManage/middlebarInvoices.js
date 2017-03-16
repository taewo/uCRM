import React, { Component } from 'react';
import { Link } from 'react-router';

class MiddlebarInvoices extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Link to={'/admin/manage/invoices'}>
          MiddlebarInvoices
        </Link>
      </div>
    );
  }
}

export default MiddlebarInvoices;
