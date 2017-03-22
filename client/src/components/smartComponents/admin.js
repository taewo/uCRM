import React, { Component } from 'react';
import { ButtonGroup, Button, MenuItem } from 'react-bootstrap';
import SidebarManage from '../dummyComponents/onAdmin/sidebarManage';
import SidebarReport from '../dummyComponents/onAdmin/sidebarReport';
import SidebarSetting from '../dummyComponents/onAdmin/sidebarSetting';
import SidebarFinance from '../dummyComponents/onAdmin/sidebarFinance';

import { tokenChecker } from '../../config';

const aStyle = {
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
}

class Admin extends Component {

  componentDidMount() {
    tokenChecker();
  }

  render() {
    return (
      <div className="a" style={aStyle}>
        <div className="Amdin">
          <ButtonGroup vertical>
            <Button><SidebarManage /></Button>
            <Button><SidebarFinance /></Button>
            <Button><SidebarReport /></Button>
            <Button><SidebarSetting /></Button>
          </ButtonGroup>
        </div>
        <div>
          {this.props.children}
        </div>
      </div>



    );
  }
}


export default Admin;
