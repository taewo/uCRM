import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AllMember, CurrentMember, LatestActivity } from '../dummyComponents/onDashboard';
import * as dashboardActions from '../../actions/dashboardActions';
import '../../../public/style.css';

class Dashboard extends Component {
  componentDidMount() {
    this.props.dashboardShow();
  }

  render() {
    return (
      <div className="dashoboard_container">
        <div className="allMember">
          <AllMember allMember={this.props.allMemberOnChange} />
        </div>
        <div className="currentMember">
          <CurrentMember currentMember={this.props.currentMemberOnChange} />
        </div>
        <div className="latestActivity">
          <LatestActivity latestActivity={this.props.latestActivityOnChange} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allMemberOnChange: state.dashboardReducer.allMember,
  currentMemberOnChange: state.dashboardReducer.currentMember,
  latestActivityOnChange: state.dashboardReducer.latestActivity,
});

const mapDispatchToProps = dispatch => ({
  dashboardShow: () => { dispatch(dashboardActions.dashboardShow()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
