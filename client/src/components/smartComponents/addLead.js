import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import { tokenChecker, API_URL } from '../../config';
import { browserHistory } from 'react-router';

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
    const headers = {
      token: sessionStorage.getItem('userToken'),
    };
    console.log('e', e);
    axios({
      method: 'post',
      url: `${API_URL}/lead`,
      data: {
        space_id: sessionStorage.getItem('userSpaceListId'),
        date: this.state.today,
        name: e.name,
        email: e.email,
        mobile: e.mobile,
        note: e.note,
        type: e.type,
      },
      params: { leadDetails: sessionStorage.getItem('userSpaceListId') },
      headers: headers,
    })
    .then((res) => {
      console.log(11);
      console.log('res', res);
      browserHistory.push('/admin/manage/lead');
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
            <label><Field name="type" component="input" type="radio" value="메일" /> Email</label>
            <label><Field name="type" component="input" type="radio" value="전화" /> Phone</label>
            <label><Field name="type" component="input" type="radio" value="방문" /> Tour</label>
            <label><Field name="type" component="input" type="radio" value="홈페이지" /> HomePage</label>
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
