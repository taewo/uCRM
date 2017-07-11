import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
};

const defaultProps = {
};

class BodyAddMember extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Link to={'/admin/manage/members/add'}>
          BodyAddMember
        </Link>
      </div>
    );
  }
}
BodyAddMember.propTypes = propTypes;
BodyAddMember.defaultProps = defaultProps;

export default BodyAddMember;

/*
Dashboard/
  index.js
  dummyComponents
Admin/
  index.js
  dummyComponents
Admin/
  index.js
  dummyComponents
reducers
dummyComponents
*/
