import React, { Component } from 'react';
import { Link } from 'react-router';

class MiddlebarLead extends Component {
  render() {
    return (
      <div>
        <Link to={'/admin/manage/lead'}>
          Lead
        </Link>
      </div>
    );
  }
}

export default MiddlebarLead;
