import React, { Component, PropTypes } from 'react';

const propTypes = {
};

const defaultProps = {
};

class CurrentMember extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        CurrentMember :
        {this.props.currentMember}
      </div>
    );
  }
}
CurrentMember.propTypes = propTypes;
CurrentMember.defaultProps = defaultProps;

export default CurrentMember;
