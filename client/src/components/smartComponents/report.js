import React, { Component, PropTypes } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { MiddlebarChurn, MiddlebarReportLead, MiddlebarReportSpace, MiddlebarRevenue } from '../dummyComponents/onReport';

const reportButtonStyle = {
  height: '35%',
};

const reportStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  border: 'none',
};


class Report extends Component {

  componentDidMount() {
    console.log('hi');
  }
  render() {
    return (
      <div className="Report" style={reportStyle}>
        <div className="Manage">
          <ButtonGroup vertical className="report_button" style={reportButtonStyle}>
            <LinkContainer to="/admin/report/churn">
              <Button className="report_button" style={reportButtonStyle}>
                이탈
              </Button>
            </LinkContainer>
            <LinkContainer to="/admin/report/lead">
              <Button className="report_button" style={reportButtonStyle}>
                잠재고객
              </Button>
            </LinkContainer>
            <LinkContainer to="/admin/report/space">
              <Button className="report_button" style={reportButtonStyle}>
                이용률
              </Button>
            </LinkContainer>
            <LinkContainer to="/admin/report/revenue">
              <Button className="report_button" style={reportButtonStyle}>
                수익
              </Button>
            </LinkContainer>
          </ButtonGroup>
        </div>
        <div className="bodyStyle">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Report;
