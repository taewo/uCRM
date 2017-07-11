import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import '../../../../public/style.css';
const currentMemberImg = require('../../../../image/currentMember.svg');

class CurrentMember extends Component {
  render() {
    const title2 = (
      <h3>현재 멤버수</h3>
    );
    return (
      <div className="dashboard_panel">
        <Panel header={title2} bsStyle="success">
          <img src={currentMemberImg} />
          CurrentMember :sadkfjaskfjs
          {this.props.currentMember}
        </Panel>
      </div>
    );
  }
}

export default CurrentMember;
