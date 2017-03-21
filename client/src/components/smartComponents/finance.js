import React, { Component } from 'react';
import { MiddlebarExpense, MiddlebarPayment } from '../dummyComponents/onFinance';

class Finance extends Component {
  render() {
    return (
      <div className="Finance">
        <MiddlebarExpense />
        <MiddlebarPayment />
        <br /><br />
        {this.props.children}
      </div>
    );
  }
}

export default Finance;
