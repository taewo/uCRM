import React, { Component, PropTypes } from 'react';

class Confirm extends Component {

  render() {
    return (
      <button onClick={this.props.logInConfirm}>Button</button>
    );
  }
}

export default Confirm;
