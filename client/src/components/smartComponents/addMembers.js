import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
// import InfiniteCalendar from 'react-infinite-calendar';
// import 'react-infinite-calendar/styles.css'; // Make sure to import the default stylesheet
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

function sundays(day) {
  return day.getDay() === 0;
}

class AddMembers extends Component {

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.show = this.show.bind(this);
    this.state = {
      selectedDay: new Date(),
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

  show() {
    document.getElementById('show').innerHTML = document.getElementById('input').value;
  }

  render() {
    return (
      <div id="show">
        <form onSubmit={this.props.handleSubmit(this.show)}>
          <div>
            <label>Name</label>
            <div>
              <Field name="Name" component="input" type="text" placeholder="Name" />
            </div>
          </div>
          <div>
            <label>Email</label>
            <div>
              <Field name="email" component="input" type="text" placeholder="Email" />
            </div>
          </div>
          <div>
            <label>Mobile</label>
            <div>
              <Field name="mobile" component="input" type="text" placeholder="Mobile" />
            </div>
          </div>
          <div>
            <lavel>joined date</lavel>
            <DayPicker
              initialMonth={new Date(2017, 1)}
              disabledDays={sundays}
              selectedDays={this.state.selectedDay}
              onDayClick={this.handleDayClick}
            />
          </div>
          <div>
            <label>Gender</label>
            <div>
              <label><Field name="sex" component="input" type="radio" value="male" /> Male</label>
              <label><Field name="sex" component="input" type="radio" value="female" /> Female</label>
            </div>
          </div>
          <div>
            <label>Notes</label>
            <div>
              <Field name="notes" component="textarea" />
            </div>
          </div>
          <div>
            <button
              type="submit"
              onClick={this.show}
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
  form: 'simple',
})(AddMembers);
