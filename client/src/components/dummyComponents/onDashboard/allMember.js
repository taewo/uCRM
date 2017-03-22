import React, { Component } from 'react';
import { Panel, Glyphicon, Button } from 'react-bootstrap';
import '../../../../public/style.css';
const allMemberImg = require('../../../../image/allMember.svg');

class AllMember extends Component {
  render() {
    const title1 = (
      <h3>전체 멤버수</h3>
    );
    return (
      <div className="dashboard_panel">
          <Panel header={title1} bsStyle="danger">
            <img src={allMemberImg} />
              AllMember : sadkfjaskfjs
              {this.props.allMember}
          </Panel>
      </div>
    );
  }
}

export default AllMember;
