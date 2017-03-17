import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
};

const defaultProps = {
};

class MiddlebarReportLead extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Link to={'/admin/report/lead'}>
          MiddlebarReportLead
        </Link>
      </div>
    );
  }
}
MiddlebarReportLead.propTypes = propTypes;
MiddlebarReportLead.defaultProps = defaultProps;

export default MiddlebarReportLead;
