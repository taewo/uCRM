import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
};

const defaultProps = {
};

class SidebarReport extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Link to={'/admin/report/churn'}>
          Report
        </Link>
      </div>
    );
  }
}
SidebarReport.propTypes = propTypes;
SidebarReport.defaultProps = defaultProps;

export default SidebarReport;
