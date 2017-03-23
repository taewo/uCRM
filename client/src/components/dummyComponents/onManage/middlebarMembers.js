import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
};

const defaultProps = {
};

class MiddlebarMembers extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Link to={'/admin/manage/members'}>
          Members
        </Link>
      </div>
    );
  }
}
MiddlebarMembers.propTypes = propTypes;
MiddlebarMembers.defaultProps = defaultProps;

export default MiddlebarMembers;
