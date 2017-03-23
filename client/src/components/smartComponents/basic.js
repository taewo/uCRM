import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as basicActions from '../../actions/basicActions';
import '../../../public/style.css';
import { PageHeader, Panel } from 'react-bootstrap';
const allMemberImg = require('../../../image/allMember.svg');

class Basic extends Component {
  componentWillMount() {
    this.props.basicShow();
  }
  render() {
    const basicList = this.props.basicData ?
    this.props.basicData.map((data, i) => {
      return (
        <div key={i}>
          address: {data.address} <br />
          company_id: {data.company_id} <br />
          max_desks: {data.max_desks} <br />
          name : {data.name} <br /><br /><br />
        </div>
      );
    })
    : 'default';
    const title1 = (
      <h3>현재 멤버수</h3>
    );
    return (
      <div>
        Basic
        <PageHeader>
          <small>
            test
          </small>
          <Panel header={title1} bsStyle="danger">
            <img src={allMemberImg} alt="adf"/>
              현재 멤버수 : jh
          </Panel>
        </PageHeader>
        <br />
        {basicList}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  basicData: state.basicReducer.data,
});

const mapDispatchToProps = dispatch => ({
  basicShow: () => { dispatch(basicActions.basicShow()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Basic);
