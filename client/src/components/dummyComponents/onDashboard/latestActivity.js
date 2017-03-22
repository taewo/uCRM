import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import '../../../../public/style.css';
const latestActivityImg = require('../../../../image/latestActivity.svg');

class LatestActivity extends Component {
  render() {
    const title2 = (
      <h3>최근 활동 내역</h3>
    );
    const latestActivityList = this.props.latestActivity ?
        this.props.latestActivity.map((data, i) =>
          <div key={i}>{data.user}는 {data.type}을 {data.date}했다</div>
        )
      : [];
    return (
      <div className="dashboard_panel">
        <Panel header={title2} bsStyle="info">
          <img src={latestActivityImg} />
            Latest Activity : sadkfjaskfjs
            {latestActivityList}
        </Panel>
      </div>
    );
  }
}

export default LatestActivity;
