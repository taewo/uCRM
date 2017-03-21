import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css';
// import InfiniteCalendar from 'react-infinite-calendar';
// import 'react-infinite-calendar/styles.css'; // Make sure to import the default stylesheet
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import axios from 'axios';
import { browserHistory } from 'react-router';

const { DOM: { input, select, textarea } } = React

const types = ['월세', '가스비', '전기세', '사무용품', '행사', '간식', '기타'];
const methods = ['현금', '계좌이체', '카드'];

function sundays(day) {
  return day.getDay() === 0;
}

class AddPayment extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.submitData = this.submitData.bind(this);
    this.handleMethodClick = this.handleMethodClick.bind(this);
    this.state = {
      selectedDay: new Date(),
      selectedMethod: null,
    };
  }

  handleDayClick(day, { disabled, selected }) {
    if (disabled) {
      return;
    }
    this.setState({
      selectedDay: selected ? null : day,
    });
  }

  handleMethodClick(method) {
    this.setState({
      selectedMethod: method,
    });
  }

  submitData(e) {
    const data = Object.assign({}, e, {
      date: this.state.selectedDay,
      method: this.state.selectedMethod,
    });
    console.log(data);
    const space_id = sessionStorage.getItem('userSpaceListId');
    const API_URL = 'http://localhost:4000/api';
    const instance = {
      headers: {
        token: sessionStorage.getItem('userToken'),
      },
    };
    return axios({
      method: 'post',
      url: `${API_URL}/expense`,
      headers: instance.headers,
      data: {
        space_id,
        details: data.detail,
        amount: data.amount,
        payment_date: data.date,
        type: data.type,
        payment_method: data.method,
      },
    })
    .then((res) => {
      console.log(res);
      browserHistory.push('/admin/finance/payment');
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    console.log(this.state.selectedType);
    console.log(this.state.selectedMethod);
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div>
        <form id="payment" onSubmit={handleSubmit(this.submitData)}>
          <div>
            <label>결제방법</label>
            <DropdownList
              data={methods}
              value={this.state.selectedMethod}
              onChange={this.handleMethodClick}
            />
          </div>
          <div>
            <label>Detail</label>
            <div>
              <Field name="detail" component="input" type="text" placeholder="Detail" />
            </div>
          </div>
          <div>
            <lavel>scheduled_date</lavel>
            <DayPicker
              initialMonth={new Date(2017, 1)}
              disabledDays={sundays}
              selectedDays={this.state.selectedDay}
              onDayClick={this.handleDayClick}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={this.props.pristine || this.props.submitting}
            >
              Submit
            </button>
            <button
              type="button"
              disabled={this.props.pristine || this.props.submitting}
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

export default reduxForm({
  // form: 'reactWidgets',
  form: 'simple',
})(AddPayment);
