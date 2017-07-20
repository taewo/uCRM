import React, { Component } from 'react';

class Email extends Component {

  render() {
    return (
      <div>
        <input
          type="text" placeholder="email" onChange={e => this.props.signUpEmail(e.target.value)}
        />
      </div>
    );
  }
}

export default Email;
