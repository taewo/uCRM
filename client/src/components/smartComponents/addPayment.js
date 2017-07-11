import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css';
import { API_URL } from '../../config';

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import axios from 'axios';
import { browserHistory } from 'react-router';
import * as paymentActions from '../../actions/paymentActions';

const methods = ['현금', '계좌이체', '카드'];

function sundays(day) {
  return day.getDay() === 0;
}

class AddPayment extends Component {
  constructor(props) {
    super(props);
    this.handleStartDayClick = this.handleStartDayClick.bind(this);
    this.handleScheduleDayClick = this.handleScheduleDayClick.bind(this);
    this.handleEndDayClick = this.handleEndDayClick.bind(this);
    this.submitData = this.submitData.bind(this);
    this.handleMethodClick = this.handleMethodClick.bind(this);
    this.handleMemberClick = this.handleMemberClick.bind(this);
    this.handleBillplanClick = this.handleBillplanClick.bind(this);
    this.state = {
      selectedStartDay: new Date(),
      selectedScheduleDay: new Date(),
      selectedEndDay: new Date(),
      selectedMethod: null,
      selectedMember: null,
      selectedBillplan: null,
    };
  }

  componentDidMount() {
    this.props.paymentDataShow();
  }

  handleScheduleDayClick(day, { disabled, selected }) {
    if (disabled) {
      return;
    }
    this.setState({
      selectedScheduleDay: selected ? null : day,
    });
  }

  handleStartDayClick(day, { disabled, selected }) {
    if (disabled) {
      return;
    }
    this.setState({
      selectedStartDay: selected ? null : day,
    });
  }

  handleEndDayClick(day, { disabled, selected }) {
    if (disabled) {
      return;
    }
    this.setState({
      selectedEndDay: selected ? null : day,
    });
  }

  handleMethodClick(method) {
    this.setState({
      selectedMethod: method,
    });
  }

  handleMemberClick(member) {
    this.setState({
      selectedMember: member,
    });
  }


  handleBillplanClick(billplanName) {
    this.setState({
      selectedBillplan: billplanName,
    });
  }

  submitData(e) {
    const billplan = this.props.billplan;
    const billplanId = billplan.find(data => data.name === this.state.selectedBillplan).id;

    // billplan.forEach((data) => {
    //   if (this.state.selectedBillplan === data.name) {
    //     billplanId = data.id;
    //   }
    // });

    const data = Object.assign({}, e, {
      scheduledDate: this.state.selectedScheduleDay,
      startDate: this.state.selectedStartDay,
      endDate: this.state.selectedEndDay,
      method: this.state.selectedMethod,
      memberId: this.state.selectedMember.id,
      billplanId,
    });

    const memberId = this.props.Id;
    const billplanData = this.props.billplanData;
    const spaceId = parseInt(sessionStorage.getItem('userSpaceListId'));
    const instance = {
      headers: {
        token: sessionStorage.getItem('userToken'),
      },
    };

    return axios({
      method: 'post',
      url: `${API_URL}/member/payment`,
      headers: instance.headers,
      data: {
        space_id: spaceId,
        member_id: data.memberId,
        bill_plan_id: data.billplanId,
        start_date: data.startDate,
        end_date: data.endDate,
        payment_method: data.method,
      },
    })
    .then((res) => {
      this.props.closeModal();
      console.log(res);
      this.props.paymentShow();
    })
    .catch((err) => {
      console.log(err.response.data);
    });
  }

  render() {
    const billplan = this.props.billplan;
    const billplanName = [];
    billplan.forEach((data) => {
      billplanName.push(data.name);
    });
    const memberData = this.props.memberData;
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div>
        <form id="payment" onSubmit={handleSubmit(this.submitData)}>
          <div>
            <label>멤버</label>
            <DropdownList
              data={memberData}
              valueField="id"
              textField="name"
              value={this.state.selectedMember}
              onChange={this.handleMemberClick}
            />
          </div>
          <div>
            <label>결제방법</label>
            <DropdownList
              data={methods}
              value={this.state.selectedMethod}
              onChange={this.handleMethodClick}
            />
          </div>
          <div>
            <label>billplan</label>
            <DropdownList
              data={billplanName}
              value={this.state.selectedBillplan}
              onChange={this.handleBillplanClick}
            />
          </div>
          <div>
            <lavel>scheduled_date</lavel>
            <DayPicker
              initialMonth={new Date(2017, 1)}
              disabledDays={sundays}
              selectedDays={this.state.selectedScheduleDay}
              onDayClick={this.handleScheduleDayClick}
            />
          </div>
          <div>
            <lavel>start_date</lavel>
            <DayPicker
              initialMonth={new Date(2017, 1)}
              disabledDays={sundays}
              selectedDays={this.state.selectedStartDay}
              onDayClick={this.handleStartDayClick}
            />
          </div>
          <div>
            <lavel>end_date</lavel>
            <DayPicker
              initialMonth={new Date(2017, 1)}
              disabledDays={sundays}
              selectedDays={this.state.selectedEndDay}
              onDayClick={this.handleEndDayClick}
            />
          </div>
          <div>
            <button
              type="submit"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={this.props.reset}
            >
              Clear Values
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  billplan: state.paymentReducer.billplan,
  Id: state.paymentReducer.Id,
  memberData: state.paymentReducer.memberData,
});

const mapDispatchToProps = dispatch => ({
  paymentDataShow: () => dispatch(paymentActions.paymentDataShow()),
});


export default reduxForm({
  // form: 'reactWidgets',
  form: 'simple',
})(connect(mapStateToProps, mapDispatchToProps)(AddPayment));
// })(AddPayment);
