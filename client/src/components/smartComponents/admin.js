import React, { Component } from 'react';
import { ButtonGroup, Button, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { tokenChecker } from '../../config';
const manageImg = require('../../../image/manage.svg');
const reportImg = require('../../../image/report1.svg');
const financeImg = require('../../../image/finance2.svg');
const settingImg = require('../../../image/settings.svg');

const adminStyle = {
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
};

const adminButtonStyle = {
  height: '37%',
  border: 'none',
  // backgroundColor: 'rgb(5, 51, 178)',
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
              <Button className="admin_button" style={adminButtonStyle}>
                <img src={manageImg} alt="manage" className="adminImgSize"/>
                <br />
                관리
              </Button>
            </LinkContainer>
            <LinkContainer to="/admin/report/churn">
              <Button className="admin_button" style={adminButtonStyle}>
                <img src={reportImg} alt="report" className="adminImgSize"/>
                <br />
                분석
              </Button>
            </LinkContainer>
            <LinkContainer to="/admin/finance/expense">
              <Button className="admin_button" style={adminButtonStyle}>
                <img src={financeImg} alt="finance" className="adminImgSize"/>
                <br />
                장부
              </Button>
            </LinkContainer>
            <LinkContainer to="/admin/setting/basic">
              <Button className="admin_button" style={adminButtonStyle}>
                <img src={settingImg} alt="setting" className="adminImgSize"/>
                <br />
                설정
              </Button>
            </LinkContainer>
          </ButtonGroup>
        </div>
          {this.props.children}
      </div>
    );
  }
}


export default Admin;
