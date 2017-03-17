import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { Date, Name, SpaceId, Type, LeadPage } from '../dummyComponents/onLead';
import * as leadActions from '../../actions/leadActions';

class Lead extends Component {
  componentWillMount() {
    console.log('will mount');
    this.props.leadShow();
  }

  componentDidMount() {
    console.log('did mount');
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
        <LeadPage name={this.props.nameOnChange} />
        {/*}<SpaceId spaceId={this.props.spaceIdOnChange} />
        <Type typeLead={this.props.typeLeadOnChange} />
        <Name name={this.props.nameOnChange} />
        <Date date={this.props.dateOnChange} />*/}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // spaceIdOnChange: state.leadReducer.spaceId,
  // typeLeadOnChange: state.leadReducer.typeLead,
  nameOnChange: state.leadReducer.name,
  // dateOnChange: state.leadReducer.date,
});

const mapDispatchToProps = dispatch => ({
  leadShow: () => { dispatch(leadActions.leadShow()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Lead);
