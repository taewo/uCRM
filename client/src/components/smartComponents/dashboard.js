import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { AllMember, CurrentMember, LatestActivity, RoomReservation } from '../dummyComponents/onDashboard';
import * as dashboardActions from '../../actions/dashboardActions';

const propTypes = {
};

const defaultProps = {
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

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

const mapDispatchToProps = dispatch => ({
  dashboardShow: () => { dispatch(dashboardActions.dashboardShow()); }

});

Dashboard.propTypes = propTypes;
Dashboard.defaultProps = defaultProps;

export default connect(null, mapDispatchToProps)(Dashboard);
