import React, { Component, PropTypes } from 'react';

const propTypes = {
};

const defaultProps = {
};

class Submit extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button>Button</button>
    );
  }
}
Submit.propTypes = propTypes;
Submit.defaultProps = defaultProps;

export default Submit;
