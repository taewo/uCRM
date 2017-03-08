import React, { Component, PropTypes } from 'react';

class Submit extends Component {

  render() {
    return (
      <button onClick={this.props.signUpSubmit}>Button</button>
    );
  }
}

export default Submit;
