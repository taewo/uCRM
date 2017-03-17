import React, { Component, PropTypes } from 'react';

const propTypes = {
};

const defaultProps = {
};

class SpaceId extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>SpaceId
      <br />
      {this.props.spaceId}
      </div>
    );
  }
}
SpaceId.propTypes = propTypes;
SpaceId.defaultProps = defaultProps;

export default SpaceId;
