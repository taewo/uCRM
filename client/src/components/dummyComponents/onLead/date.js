import React, { Component } from 'react';

class Date extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        Date  <br /><br />
      {this.props.date}
      </div>
    );
  }
}

export default Date;
