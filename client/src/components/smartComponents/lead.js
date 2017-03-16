import React, { Component } from 'react';
import { Link } from 'react-router';

class Lead extends Component {
  render() {
    return (
      <div>
        Lead
        <Link to={'/admin/manage/lead/add'}>
          <br />
          Add Lead
        </Link>
      </div>
    );
  }
}

export default Lead;
