import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
};

const defaultProps = {
};

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
MiddlebarPayment.propTypes = propTypes;
MiddlebarPayment.defaultProps = defaultProps;

export default MiddlebarPayment;
