import React, { Component } from 'react';

class Name extends Component {

  render() {
    return (
      <div>
        <input
          type="text" placeholder="Name" onChange={e => this.props.signUpName(e.target.value)}
        />
      </div>
    );
  }
}

export default Name;
