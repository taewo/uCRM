import React, { Component } from 'react';
import { ButtonGroup, Button, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { MiddlebarExpense, MiddlebarPayment } from '../dummyComponents/onFinance';

const financeStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
};

const financeButtonStyle = {
  height: '37%',
  border: 'none',
};


class Finance extends Component {
  render() {
    return (
      <div className="finance" style={financeStyle}>
        <div className="Finance">
          <ButtonGroup vertical className="finance_button" style={financeButtonStyle}>
            <LinkContainer to="/admin/finance/expense">
              <Button className="finance_button" style={financeButtonStyle}>지출현황</Button>
            </LinkContainer>
            <LinkContainer to="/admin/finance/payment">
              <Button className="finance_button" style={financeButtonStyle}>계약현황</Button>
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

export default Finance;
