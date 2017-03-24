import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as dashboardActions from '../../actions/dashboardActions';
import { ListGroup, ListGroupItem, PageHeader, Panel } from 'react-bootstrap';
import '../../../public/style.css';
const allMemberImg = require('../../../image/allMember.svg');
const currentMemberImg = require('../../../image/currentMember.svg');
const latestActivityImg = require('../../../image/latestActivity.svg');
const Spinner = require('react-spinner');

class Dashboard extends Component {
  componentDidMount() {
    this.props.dashboardShow();
  }

  render() {
    if(!this.props.dashboardData) {
      return (
        <div />
      );
    }
    console.log(123, this.props.dashboardData)
    const {activeMember, expiringPayment, leadCount, latestActivity} = this.props.dashboardData
    const latestActivityCut = this.props.dashboardData.latestActivity.slice(0,13);
    const title1 = (
      <h3>현재 멤버</h3>
    );
    const title2 = (
      <h3>잠재 고객</h3>
    );
    const title3 = (
      <h3>만료 예정 멤버</h3>
    );
    return (
      <div className="dashoboard_container">
        <div className="presentMember">
          <div className="dashboard_panel">
            <Panel header={title1} bsStyle="danger">
              <img src={allMemberImg} alt="adf"/>
                현재 멤버수 : {this.props.dashboardData.activeMember}
            </Panel>
          </div>
        </div>
        <div className="latestLead">
          <div className="dashboard_panel">
            <Panel header={title2} bsStyle="success">
              <img src={currentMemberImg} alt="123"/>
                최근 방문객수 : {this.props.dashboardData.leadCount}
            </Panel>
          </div>
        </div>
        <div className="expiringMember">
          <div className="dashboard_panel">
            <Panel header={title3} bsStyle="info">
              <img src={latestActivityImg} alt="kd2" />
                만료 예정 멤버수 : {this.props.dashboardData.expiringPayment}
            </Panel>
          </div>
        </div>
        <PageHeader><small> 활동내역 </small></PageHeader>
        <ListGroup>
        {latestActivityCut.map((data, i) => {
          const editedDate = data.date.substring(2, 10).split('-');
          let checkTypes = '';
          let checkTarget = '';
          const dataType = data.type;
          if (dataType === 'billplan_creation') {
            checkTypes = '요금제가 등록되었습니다.';
            checkTarget = `'${data.target}'`;
          } else if (dataType === 'member_creation') {
            checkTypes = '신규로 입주하셨습니다.';
            checkTarget = `'${data.target}'님께서`;
          } else if (dataType === 'space_creation') {
            checkTypes = '공간이 생성되었습니다. 축하합니다!';
            checkTarget = `'${data.target}'`;
          } else if (dataType === 'lead_메일') {
            checkTypes = '메일로 문의해주셨습니다.';
            checkTarget = `'${data.target}'님께서`;
          } else if (dataType === 'lead_전화') {
            checkTypes = '전화로 문의해주셨습니다.';
            checkTarget = `'${data.target}'님께서`;
          } else if (dataType === 'lead_방문') {
            checkTypes = '직접 방문해주셨습니다.';
            checkTarget = `'${data.target}'님께서`;
          } else if (dataType === 'lead_홈페이지') {
            checkTypes = '홈페이지로 문의해주셨습니다.';
            checkTarget = `'${data.target}'님께서`;
          } else if (dataType === 'expense_creation') {
            checkTypes = '지출하였습니다.';
            checkTarget = `'${data.target}'로`;
          }
          if (i % 2 === 0) {
            return (
              <ListGroupItem bsStyle="warning">
                {editedDate[0]}년 {editedDate[1]}월 {editedDate[2]}일, {checkTarget} {checkTypes}
              </ListGroupItem>
            );
          }
          return (
            <ListGroupItem>
              {editedDate[0]}년 {editedDate[1]}월 {editedDate[2]}일, {checkTarget} {checkTypes}
            </ListGroupItem>
          );
        })}
        </ListGroup>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dashboardData: state.dashboardReducer.data,
});

const mapDispatchToProps = dispatch => ({
  dashboardShow: () => { dispatch(dashboardActions.dashboardShow()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
