import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import { tokenChecker, API_URL } from '../../config';

class AddLead extends Component {
  constructor(props){
    super(props);
    this.state = {
      today: new Date().toISOString().substring(0, 10),
    }
    this.submitData = this.submitData.bind(this);
  }

  componentDidMount() {
    tokenChecker();
  }

  submitData(e) {
    const addDate = this.state.today;
    const data = e;
    data.date = addDate;
    data.space_id = 5;
    console.log(111, data);
    const instance = {
      headers: {
        token: localStorage.getItem('userToken'),
      },
    };
  //   "space_id": 13,
  // "date": "2017-01-01",
  // "name": "ygdb",
  // "email": "yg@gmail.com",
  // "mobile": "010-0000-0000",
  // "note": "this customer is ugly",
  // "type": "email"
    axios({
      method: 'post',
      url: `${API_URL}/lead`,
      req:
      date: data.date,
      space_id: data.space_id,
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      note: data.note,
      type: data.type,
      headers: instance.headers,
    })
    .then((res) => {
      console.log(11);
      console.log('res', res);
    })
    .catch((err) => {
      console.log(222);
      console.log('err', err);
    });
  }
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <form onSubmit={handleSubmit(this.submitData)}>
        <div>
          <label>Name</label>
          <div>
            <Field name="name" component="input" type="text" placeholder="Name"/>
          </div>
        </div>
        <div>
          <label>Email</label>
          <div>
            <Field name="email" component="input" type="email" placeholder="Email"/>
          </div>
        </div>
        <div>
          <label>Mobile</label>
          <div>
            <Field name="mobile" component="input" type="tel" placeholder="Mobile"/>
          </div>
        </div>
        <div>
          <label>Notes</label>
          <div>
            <Field name="note" component="textarea"/>
          </div>
        </div>
        <div>
          <label>Type</label>
          <div>
            <label><Field name="type" component="input" type="radio" value="email" /> Email</label>
            <label><Field name="type" component="input" type="radio" value="phone" /> Phone</label>
            <label><Field name="type" component="input" type="radio" value="tour" /> Tour</label>
          </div>
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}>Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        </div>
      </form>
    )
  }
}


export default reduxForm({
  form: 'simple'
})(AddLead);
