import React, { Component } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { MiddlebarDashboard, MiddlebarMembers, MiddlebarLead } from '../dummyComponents/onManage';


const manageButtonStyle = {
  height: '35%',
};

const manageStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  border: 'none',
};


class Manage extends Component {
  render() {

    return (
      <div className="manage" style={manageStyle}>
        <div className="Manage">
          <ButtonGroup vertical className="manage_button" style={manageButtonStyle}>
            <LinkContainer to="/admin/manage/dashboard">
              <Button className="manage_button" style={manageButtonStyle}>Dashboard</Button>
            </LinkContainer>
            <LinkContainer to="/admin/manage/members">
              <Button className="manage_button" style={manageButtonStyle}>Members</Button>
            </LinkContainer>
            <LinkContainer to="/admin/manage/lead">
              <Button className="manage_button" style={manageButtonStyle}>Lead</Button>
            </LinkContainer>
          </ButtonGroup>
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Manage;
