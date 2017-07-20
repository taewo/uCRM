import React, { Component } from 'react';

class Password extends Component {
  render() {
    return (
      <div>
        <input
          type="password" placeholder="Password"
          onChange={e => this.props.logInPassword(e.target.value)}
        />
      </div>
    );
  }
}

export default Password;
