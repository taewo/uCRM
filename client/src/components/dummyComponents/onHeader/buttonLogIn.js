import React, { Component } from 'react';
import { Container, Menu, Button, Modal } from 'semantic-ui-react';
import { Link } from 'react-router';

class ButtonLogIn extends Component {

  render() {
    return (
      <Menu.Item>
        <Modal trigger={<Button>Login</Button>}>
          <Modal.Header>Login</Modal.Header>
        </Modal>
      </Menu.Item>

    );
  }
}

export default ButtonLogIn;
