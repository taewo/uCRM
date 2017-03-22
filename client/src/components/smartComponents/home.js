import React, { Component } from 'react';

const HomeImg = require('../../../image/home.jpg');

const HomeStyle = {
  width: '100%',
  height: '100%',
  backgroundImage: 'url({HomeImg})',
}

class Home extends Component {

  render() {
    return (
      <div className="Home">Home</div>
    );
  }
}

export default Home;
