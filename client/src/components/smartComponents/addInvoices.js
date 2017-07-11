import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
// import InfiniteCalendar from 'react-infinite-calendar';
// import 'react-infinite-calendar/styles.css'; // Make sure to import the default stylesheet
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
const  { DOM: { input, select, textarea } } = React

function sundays(day) {
  return day.getDay() === 0;
}

class AddInvoices extends Component {
  constructor(props) {
    super(props);
    this.submitData = this.submitData.bind(this);
  }

  submitData(e) {
    const data = Object.assign({}, e);
    console.log(11, data);
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <div>
        <form id="name" onSubmit={handleSubmit(this.submitData)}>
          <div>
            <label>Name</label>
            <div>
              <Field name="Name" component="input" type="text" placeholder="Name" />
            </div>
          </div>
          <div>
            <label>Cost</label>
            <div>
              <Field name="cost" component="input" type="text" placeholder="Cost" />
            </div>
          </div>
          <div>
            <label>isDaily</label>
            <div>
              <label><Field name="isDaily" component="input" type="radio" value="yes" /> yes </label>
              <label><Field name="isDaily" component="input" type="radio" value="no" /> no </label>
            </div>
          </div>
          <div>
            <label>Duration</label>
            <div>
              <label><Field name="Duration" component="input" type="radio" value="1달" /> 1달 </label>
              <label><Field name="Duration" component="input" type="radio" value="3달" /> 3달 </label>
              <label><Field name="Duration" component="input" type="radio" value="6달" /> 6달</label>
            </div>
          </div>
          <div>
            <label>Description</label>
            <div>
              <Field name="Description" component="textarea" />
            </div>
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
  form: 'simple',
})(AddInvoices);
