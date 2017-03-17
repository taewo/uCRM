import React, { Component } from 'react';

class Date extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: true,
    };
  }

  check

  render() {
    console.log(111,(typeof this.props.date))
    return (
      <div>
        {this.props.space_id} 스페이스에서, {this.props.type} 로, {this.props.name} 님께서 컨택, {this.props.date.substring(0,10)}
      </div>
    );
  }
}

export default Date;
