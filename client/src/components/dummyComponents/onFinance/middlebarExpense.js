import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
};

const defaultProps = {
};

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
MiddlebarExpense.propTypes = propTypes;
MiddlebarExpense.defaultProps = defaultProps;

export default MiddlebarExpense;
