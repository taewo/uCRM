import React, { Component } from 'react';

class Companyname extends Component {

  render() {
    return (
      <div>
        <input
          type="text" placeholder="companyname" onChange={e => this.props.signUpCompanyname(e.target.value)}
        />
      </div>
    );
  }
}

export default Companyname;
