import React, { Component, PropTypes } from 'react';
import MiddlebarDashboard from '../dummyComponents/onManage/middlebarDashboard';

const propTypes = {
};

const defaultProps = {
};

class Manage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Manage">
        <MiddlebarDashboard />
        {this.props.children}
      </div>
    );
  }
}
Manage.propTypes = propTypes;
Manage.defaultProps = defaultProps;

export default Manage;
