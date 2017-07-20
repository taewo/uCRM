import React, { Component } from 'react';

class Userid extends Component {

  render() {
    return (
      <div>
        <input
          type="text" placeholder="Userid" onChange={e => this.props.logInUserId(e.target.value)}
        />
      </div>
    );
  }
}

export default Userid;
