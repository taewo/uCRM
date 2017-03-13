import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const propTypes = {
};

const defaultProps = {
};

class Invoices extends Component {
  render() {
    const invoiceInfo = ['a', 'b', 'c'];
    return (
      <div>
        <Link to={'/admin/manage/invoices/add'}>
          Add Invoices
        </Link>
        <br />
        {invoiceInfo}
      </div>
    );
  }
}

Invoices.propTypes = propTypes;
Invoices.defaultProps = defaultProps;

export default Invoices;
