import React, { Component, PropTypes } from 'react';
import SidebarManage from '../dummyComponents/onAdmin/sidebarManage';

const propTypes = {
};

const defaultProps = {
};

class Admin extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Admin">
        <SidebarManage />
        {this.props.children}
      </div>
    );
  }
}
Admin.propTypes = propTypes;
Admin.defaultProps = defaultProps;

export default Admin;
