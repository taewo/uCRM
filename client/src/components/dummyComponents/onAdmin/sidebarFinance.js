import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
};

const defaultProps = {
};

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
SidebarFinance.propTypes = propTypes;
SidebarFinance.defaultProps = defaultProps;

export default SidebarFinance;
