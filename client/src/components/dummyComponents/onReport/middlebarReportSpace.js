import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
};

const defaultProps = {
};

class MiddlebarReportSpace extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Link to={'/admin/report/space'}>
          MiddlebarReportSpace
        </Link>
      </div>
    );
  }
}
MiddlebarReportSpace.propTypes = propTypes;
MiddlebarReportSpace.defaultProps = defaultProps;

export default MiddlebarReportSpace;
