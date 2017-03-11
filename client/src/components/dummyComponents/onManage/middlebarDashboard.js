import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
};

const defaultProps = {
};

class MiddlebarDashboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Link to={'/admin/manage/dashboard'}>
          MiddlebarDashboard
        </Link>
      </div>
    );
  }
}
MiddlebarDashboard.propTypes = propTypes;
MiddlebarDashboard.defaultProps = defaultProps;

export default MiddlebarDashboard;
