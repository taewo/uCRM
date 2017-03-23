import React, { Component } from 'react';
import { ButtonGroup, Button, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { MiddlebarBasic, MiddlebarBillPlan, MiddlebarSpace } from '../dummyComponents/onSetting';

const settingStyle = {
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
};

const settingButtonStyle = {
  height: '35%',
  border: 'none',
};

class Setting extends Component {
  render() {
    return (
      <div className="setting" style={settingStyle}>
        <div className="Setting">
          <ButtonGroup vertical className="setting_button" style={settingButtonStyle}>
            <LinkContainer to="/admin/setting/basic">
              <Button className="setting_button" style={settingButtonStyle}>기본설정</Button>
            </LinkContainer>
            <LinkContainer to="/admin/setting/billplan">
              <Button className="setting_button" style={settingButtonStyle}>요금제</Button>
            </LinkContainer>
            <LinkContainer to="/admin/setting/space">
              <Button className="setting_button" style={settingButtonStyle}>공간</Button>
            </LinkContainer>
          </ButtonGroup>
        </div>
          {this.props.children}
      </div>
    );
  }
}
export default Setting;
