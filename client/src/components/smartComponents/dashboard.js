import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AllMember, CurrentMember, LatestActivity, RoomReservation } from '../dummyComponents/onDashboard';
import * as dashboardActions from '../../actions/dashboardActions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.dashboardShow();
  }

  render() {
    return (
      <div className="Dashboard">
        <AllMember allMember={this.props.allMemberOnChange} />
        <CurrentMember currentMember={this.props.currentMemberOnChange} />
        <LatestActivity latestActivity={this.props.latestActivityOnChange} />
        <RoomReservation roomReservation={this.props.roomReservationOnChange} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allMemberOnChange: state.dashboardReducer.allMember,
  currentMemberOnChange: state.dashboardReducer.currentMember,
  latestActivityOnChange: state.dashboardReducer.latestActivity,
  roomReservationOnChange: state.dashboardReducer.roomReservation,
});

const mapDispatchToProps = dispatch => ({
  dashboardShow: () => { dispatch(dashboardActions.dashboardShow()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
