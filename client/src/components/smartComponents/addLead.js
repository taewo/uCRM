import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import { tokenChecker, API_URL } from '../../config';

class AddLead extends Component {
  constructor(props){
    super(props);
    this.state = {
      today: new Date(),
    }
    this.submitData = this.submitData.bind(this);
  }

  componentDidMount() {
    tokenChecker();
  }

  submitData(e) {
    const date = JSON.stringify(this.state.today)
    const data = e;
    data.date = date
    console.log(111,data);
    const instance = {
      headers: {
        token: localStorage.getItem('userToken'),
      },
    };
    axios({
      method: 'post',
      url: `${API_URL}/lead`,
      headers: instance.headers
    })
    .then((res) => {
      console.log('res',res)
    })
    .catch((err) => {
      console.log('err',err);
    })
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
