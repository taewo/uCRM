import React, { Component } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { MiddlebarDashboard, MiddlebarMembers, MiddlebarLead } from '../dummyComponents/onManage';


const manageButtonStyle = {
  // width: '100%',
  height: '37%',
  border: 'none',
};

const manageStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  // border: 'none',
};

const bodyStyle = {
  width: '100%',
  height: '100%',
};

class Manage extends Component {
  render() {
    return (
      <div className="manage" style={manageStyle}>
        <div className="Manage">
          <ButtonGroup vertical className="manage_button" style={manageButtonStyle}>
            <LinkContainer to="/admin/manage/dashboard">
              <Button className="manage_button" style={manageButtonStyle}>
                홈
              </Button>
            </LinkContainer>
            <LinkContainer to="/admin/manage/members">
              <Button className="manage_button" style={manageButtonStyle}>
                멤버
              </Button>
            </LinkContainer>
            <LinkContainer to="/admin/manage/lead">
              <Button className="manage_button" style={manageButtonStyle}>
                잠재고객
              </Button>
            </LinkContainer>
          </ButtonGroup>
        </div>
        <div className="bodyStyle">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Manage;
