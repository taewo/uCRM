import React, { Component } from 'react';

const HomeImg = require('../../../image/final_landing.png');

// const HomeStyle = {
//   width: '100%',
//   height: '100%',
//   // backgroundImage: `url(${HomeImg})`,
//   // backgroundSize: 'contain',
//   backgroundRepeat: 'no-repeat',
// };

class Home extends Component {

  render() {
    return (
      <div className="Home" >
        <img src={HomeImg} alt="home" className="homeImg"/>
      </div>
    );
  }
}

export default Home;
