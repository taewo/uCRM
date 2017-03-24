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

class AddExpense extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.submitData = this.submitData.bind(this);
    this.handleTypeClick = this.handleTypeClick.bind(this);
    this.handleMethodClick = this.handleMethodClick.bind(this);
    this.state = {
      selectedDay: new Date(),
      selectedType: null,
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

  handleTypeClick(type) {
    this.setState({
      selectedType: type,
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
      type: this.state.selectedType,
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
      this.props.closeModal();
      this.props.expenseShow();
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
        <form id="expense" onSubmit={handleSubmit(this.submitData)}>
          <div>
            <label>타입</label>
            <DropdownList
              data={types}
              value={this.state.selectedType}
              onChange={this.handleTypeClick}
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
            <label>Detail</label>
            <div>
              <Field name="detail" component="input" type="text" placeholder="Detail" />
            </div>
          </div>
          <div>
            <label>Amount</label>
            <div>
              <Field name="amount" component="input" type="text" placeholder="Amount" />
            </div>
          </div>
          <div>
            <lavel>payment_date</lavel>
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
        <div id="name_result" ></div>
      </div>
    );
  }
}

export default reduxForm({
  // form: 'reactWidgets',
  form: 'simple',
})(AddExpense);
