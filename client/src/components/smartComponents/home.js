import React, { Component } from 'react';

const HomeImg = require('../../../image/home.jpg');

const HomeStyle = {
  width: '100%',
  height: '100%',
  backgroundImage: `url(${HomeImg})`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
};

class Home extends Component {

  render() {
    return (
      <div className="Home" style={HomeStyle}>Home</div>
    );
  }
}

export default Home;
