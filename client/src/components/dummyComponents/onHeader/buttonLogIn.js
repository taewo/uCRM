import React, { Component } from 'react';
import { Container, Menu, Button } from 'semantic-ui-react';
import { Link } from 'react-router';

class ButtonLogIn extends Component {

  render() {
    return (
      <Menu.Item>
        <Link to={'/login'}>login</Link>
      </Menu.Item>

    );
  }
}

export default ButtonLogIn;
