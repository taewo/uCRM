import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { LeadPage } from '../dummyComponents/onLead';
import * as leadActions from '../../actions/leadActions';

class Lead extends Component {
  componentWillMount() {
    console.log('will mount');
    this.props.leadShow();
  }

  componentDidMount() {
    console.log('did mount');
    console.log('@#!$%^$##%', this.props.nameOnChange)
  }
  render() {
    return (
      <div>
        Lead page<br />
        <Link to={`/admin/manage/lead/add`}>
          addLead
        </Link>
        <br />
        <br />
        <LeadPage data={this.props.nameOnChange} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  nameOnChange: state.leadReducer.data,
});

const mapDispatchToProps = dispatch => ({
  leadShow: () => { dispatch(leadActions.leadShow()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Lead);
