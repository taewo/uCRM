import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
};

const defaultProps = {
};

class MiddlebarRevenue extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Link to={'/admin/report/revenue'}>
          MiddlebarReportRevenue
        </Link>
      </div>
    );
  }
}
MiddlebarRevenue.propTypes = propTypes;
MiddlebarRevenue.defaultProps = defaultProps;

export default MiddlebarRevenue;
