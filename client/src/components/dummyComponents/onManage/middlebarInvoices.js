import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
};

const defaultProps = {
};

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
MiddlebarInvoices.propTypes = propTypes;
MiddlebarInvoices.defaultProps = defaultProps;

export default MiddlebarInvoices;
