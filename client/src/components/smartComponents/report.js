import React, { Component, PropTypes } from 'react';
import { MiddlebarChurn, MiddlebarReportLead } from '../dummyComponents/onReport';

const propTypes = {
};

const defaultProps = {
};

class Report extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log('hi');
  }
  render() {
    return (
      <div className="Report">
        <MiddlebarChurn />
        <MiddlebarReportLead />
        <br /><br />
        {this.props.children}
      </div>
    );
  }
}
Report.propTypes = propTypes;
Report.defaultProps = defaultProps;

export default Report;
