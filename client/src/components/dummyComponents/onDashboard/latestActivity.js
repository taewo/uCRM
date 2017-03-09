import React, { Component, PropTypes } from 'react';

const propTypes = {
};

const defaultProps = {
};

class LatestActivity extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        LatestActivity :
        {this.props.latestActivity}
      </div>
    );
  }
}
LatestActivity.propTypes = propTypes;
LatestActivity.defaultProps = defaultProps;

export default LatestActivity;
