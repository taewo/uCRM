import React, { Component } from 'react';
import { ButtonGroup, Button, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { tokenChecker } from '../../config';

const manageImg = require('../../../image/manage.svg');
const reportImg = require('../../../image/report1.svg');
const financeImg = require('../../../image/finance2.svg');
const settingImg = require('../../../image/settings.svg');

const adminButtonStyle = {
  height: '37%',
  border: 'none',
  // backgroundColor: 'rgb(5, 51, 178)',
};

const test = {
  a: 1,
};

const adminStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
};

class Admin extends Component {
  componentDidMount() {
    tokenChecker();
  }

  render() {
    const pathname = this.props.pathname;

    const menuList = [{
      to: '/admin/manage/dashboard',
      indexURL: '/admin/manage',
      className: 'admin_button',
      src: manageImg,
      text: '관리',
    }, {
      to: '/admin/report/churn',
      indexURL: '/admin/report',
      className: 'admin_button',
      src: reportImg,
      text: '분석',
    }, {
      to: '/admin/finance/expense',
      indexURL: '/admin/finance',
      className: 'admin_button',
      src: financeImg,
      text: '장부',
    }, {
      to: '/admin/setting/basic',
      indexURL: '/admin/setting',
      className: 'admin_button',
      src: settingImg,
      text: '설정',
    }];

    const linkContainers = menuList.map((menuData) => {
      console.log('pathname?? ', pathname)
      const className = `${menuData.className} ${pathname.indexOf(menuData.indexURL) === 0 ? 'active' : ''}`;
      // console.log('className?? ', className);
      return (
        <LinkContainer to={menuData.to} key={menuData.text}>
          <Button className={className} style={adminButtonStyle}>
            <img src={menuData.src} alt="manage" className="adminImgSize" />
            <br />
            {menuData.text}
          </Button>
        </LinkContainer>
      );
    });

    return (
      <div className="admin" style={adminStyle}>
        <div className="Amdin">
          <ButtonGroup vertical className="admin_button" style={adminButtonStyle}>
            {linkContainers}
          </ButtonGroup>
        </div>
          {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pathname: state.routing.locationBeforeTransitions.pathname,
});

export default connect(mapStateToProps)(Admin);
