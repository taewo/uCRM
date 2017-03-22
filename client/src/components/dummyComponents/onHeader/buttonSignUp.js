import React, { Component } from 'react';
import { Link } from 'react-router';
import { Button, Menu, Container } from 'semantic-ui-react';

class ButtonSignUp extends Component {
  render() {
    return (
      <Menu.Item>
        <Link to={'/signup'}>signup</Link>
      </Menu.Item>
    );
  }
}

export default ButtonSignUp;
