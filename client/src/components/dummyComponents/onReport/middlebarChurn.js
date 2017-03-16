import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
};

const defaultProps = {
};

class MiddlebarChurn extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Link to={'/admin/report/churn'}>
          Middlebarchurn
        </Link>
      </div>
    );
  }
}
MiddlebarChurn.propTypes = propTypes;
MiddlebarChurn.defaultProps = defaultProps;

export default MiddlebarChurn;
