import React, { Component } from 'react';
import { ButtonGroup, Button, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { tokenChecker } from '../../config';

const adminStyle = {
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
};

const adminButtonStyle = {
  height: '35%',
  border: 'none',
};

class Admin extends Component {

  componentDidMount() {
    tokenChecker();
  }

  render() {
    return (
      <div className="admin" style={adminStyle}>
        <div className="Amdin">
          <ButtonGroup vertical className="admin_button" style={adminButtonStyle}>
            <LinkContainer to="/admin/manage/dashboard">
              <Button className="admin_button" style={adminButtonStyle}>Manage</Button>
            </LinkContainer>
            <LinkContainer to="/admin/report/churn">
              <Button className="admin_button" style={adminButtonStyle}>Report</Button>
            </LinkContainer>
            <LinkContainer to="/admin/finance/expense">
              <Button className="admin_button" style={adminButtonStyle}>Finance</Button>
            </LinkContainer>
            <LinkContainer to="/admin/setting/basic">
              <Button className="admin_button" style={adminButtonStyle}>Setting</Button>
            </LinkContainer>
          </ButtonGroup>
        </div>
          {this.props.children}
      </div>



    );
  }
}


export default Admin;
