import React, { Component } from 'react';

class Password extends Component {

  render() {
    return (
      <div>
        <input
          type="text" placeholder="Password" onChange={e => this.props.signUpPassword(e.target.value)}
        />
      </div>
    );
  }
}

export default Password;
