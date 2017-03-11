import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
};

const defaultProps = {
};

class AddMember extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Link to={'/admin/manage/members/add'}>
          AddMember
        </Link>
      </div>
    );
  }
}
AddMember.propTypes = propTypes;
AddMember.defaultProps = defaultProps;

export default AddMember;
