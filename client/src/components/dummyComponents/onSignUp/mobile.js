import React, { Component } from 'react';

class Mobile extends Component {

  render() {
    return (
      <div>
        <input
          type="text" placeholder="Mobile" onChange={e => this.props.signUpMobile(e.target.value)}
        />
      </div>
    );
  }
}

export default Mobile;
