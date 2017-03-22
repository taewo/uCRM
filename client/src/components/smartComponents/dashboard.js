import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AllMember, CurrentMember, LatestActivity } from '../dummyComponents/onDashboard';
import * as dashboardActions from '../../actions/dashboardActions';
import { ListGroup, ListGroupItem, PageHeader } from 'react-bootstrap';
import '../../../public/style.css';
const latestActivity2 = require('../../../image/latestActivity2.svg');

class Dashboard extends Component {
  componentWillMount() {
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
        <PageHeader><small> 최근 활동 상황 </small></PageHeader>
        <ListGroup>
          <ListGroupItem>Item 1</ListGroupItem>
          <ListGroupItem bsStyle="warning">Item 2</ListGroupItem>
          <ListGroupItem>Item 3</ListGroupItem>
          <ListGroupItem bsStyle="warning">Item 4</ListGroupItem>
        </ListGroup>
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
