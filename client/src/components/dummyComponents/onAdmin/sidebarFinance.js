import React, { Component } from 'react';
import { Link } from 'react-router';

class SidebarFinance extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Link to={'/admin/finance/expense'}>
          Finance
        </Link>
      </div>

    );
  }
}

export default SidebarFinance;
