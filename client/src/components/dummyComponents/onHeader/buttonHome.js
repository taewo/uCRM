import React, { Component } from 'react';
import { Link } from 'react-router';
import { Button, Menu, Container } from 'semantic-ui-react';

class ButtonHome extends Component {
  render() {
    return (
      <Menu.Item>
        <Link to={'/'}>Home</Link>
      </Menu.Item>
    );
  }
}

export default ButtonHome;
