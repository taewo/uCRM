import React, { Component } from 'react';
import { Link } from 'react-router';

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
