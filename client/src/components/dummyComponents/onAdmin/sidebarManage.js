import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
};

const defaultProps = {
};

class SidebarManage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Link to={'/admin/manage/dashboard'}>
          SidebarManage
        </Link>
      </div>

    );
  }
}
SidebarManage.propTypes = propTypes;
SidebarManage.defaultProps = defaultProps;

export default SidebarManage;
