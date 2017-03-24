import React, { Component } from 'react';
import { ButtonGroup, Button, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { MiddlebarBasic, MiddlebarBillPlan, MiddlebarSpace } from '../dummyComponents/onSetting';

const settingStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
};

const settingButtonStyle = {
  height: '37%',
  border: 'none',
};

class Setting extends Component {
  render() {
    return (
      <div className="setting" style={settingStyle}>
        <div className="Setting">
          <ButtonGroup vertical className="setting_button" style={settingButtonStyle}>
            <LinkContainer to="/admin/setting/basic">
              <Button className="setting_button" style={settingButtonStyle}>기본 설정</Button>
            </LinkContainer>
            <LinkContainer to="/admin/setting/billplan">
              <Button className="setting_button" style={settingButtonStyle}>요금제 설정</Button>
            </LinkContainer>
            <LinkContainer to="/admin/setting/space">
              <Button className="setting_button" style={settingButtonStyle}>공간 설정</Button>
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
export default Setting;
