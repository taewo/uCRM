import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as dashboardActions from '../../actions/dashboardActions';
import { ListGroup, ListGroupItem, PageHeader, Panel } from 'react-bootstrap';
import '../../../public/style.css';
const allMemberImg = require('../../../image/allMember.svg');
const currentMemberImg = require('../../../image/currentMember.svg');
const latestActivityImg = require('../../../image/latestActivity.svg');


class Dashboard extends Component {
  componentWillMount() {
    this.props.dashboardShow();
  }

  render() {
    if(!this.props.dashboardData) {
      return (
        <div>fail</div>
      )
    }
    const {activeMember, expiringPayment, leadCount, latestActivity} = this.props.dashboardData
    const title1 = (
      <h3>현재 멤버수</h3>
    );
    const title2 = (
      <h3>최근 방문객</h3>
    );
    const title3 = (
      <h3>만료 근접 멤버</h3>
    );
    return (
      <div className="dashoboard_container">
        <div className="allMember">
          <div className="dashboard_panel">
            <Panel header={title1} bsStyle="danger">
              <img src={allMemberImg} alt="adf"/>
                현재 멤버수 : {this.props.dashboardData.activeMember}
            </Panel>
          </div>
        </div>
        <div className="currentMember">
          <div className="dashboard_panel">
            <Panel header={title2} bsStyle="success">
              <img src={currentMemberImg} alt="123"/>
                최근 방문객수 : {this.props.dashboardData.leadCount}
            </Panel>
          </div>
        </div>
        <div className="latestActivity">
          <div className="dashboard_panel">
            <Panel header={title3} bsStyle="info">
              <img src={latestActivityImg} alt="kd2" />
                만료 예정 멤버수 : {this.props.dashboardData.expiringPayment}
            </Panel>
          </div>
        </div>
        <PageHeader><small> 최근 활동 상황 </small></PageHeader>
        <ListGroup>
        {this.props.dashboardData.latestActivity.map((data, i) => {
          const checkType = data.type === 'billplan_creation' ?
          'Bill Plan 생성'
          : 'member 등록';
          if(i % 2 === 0) {
            return (
              <ListGroupItem bsStyle="warning">
                {data.space_id} space에서 {checkType}
              </ListGroupItem>
            )
          }
          return (
            <ListGroupItem>
              {data.space_id} space에서 {checkType}
            </ListGroupItem>
          )
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
