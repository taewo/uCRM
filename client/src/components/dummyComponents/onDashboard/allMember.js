import React, { Component, PropTypes } from 'react';

const propTypes = {
};

const defaultProps = {
};

class AllMember extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        AllMember :
        {this.props.allMember}
      </div>
    );
  }
}
AllMember.propTypes = propTypes;
AllMember.defaultProps = defaultProps;

export default AllMember;
