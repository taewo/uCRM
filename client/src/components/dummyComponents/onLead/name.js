import React, { Component, PropTypes } from 'react';

const propTypes = {
};

const defaultProps = {
};

class Name extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>Name</div>
    );
  }
}
Name.propTypes = propTypes;
Name.defaultProps = defaultProps;

export default Name;
