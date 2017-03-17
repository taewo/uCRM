import React, { Component } from 'react';
import { MiddlebarBasic, MiddlebarBillPlan, MiddlebarSpace } from '../dummyComponents/onSetting';

class Setting extends Component {
  render() {
    return (
      <div>
        <MiddlebarBasic />
        <MiddlebarBillPlan />
        <MiddlebarSpace />
        <br /><br />
        {this.props.children}
      </div>
    );
  }
}
export default Setting;
