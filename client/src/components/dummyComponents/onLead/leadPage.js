import React, { Component } from 'react';
import { Date, Name, SpaceId, Type } from '../onLead';

class LeadPage extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const displayLeadData = this.props.data ?
    this.props.data.map((leadData, i) =>
      <Date
        key={i}
        date={leadData.date}
        name={leadData.name}
        space_id={leadData.space_id}
        type={leadData.type}
      />,
    )
    : [];
    return (
      <div>
        LeadPage<br /><br /><br />
        {displayLeadData}
      </div>
    );
  }
}

export default LeadPage;
