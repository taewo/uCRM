import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';
import { API_URL } from '../../config';
import axios from 'axios';

class AddSpace extends Component {
  constructor(props) {
    super(props);
    this.submitData = this.submitData.bind(this);
  }

  submitData(e) {
    console.log('data', e)
    const token = {
      token: localStorage.getItem('userToken'),
    };
    return axios({
      method: 'post',
      url: `${API_URL}/space`,
      headers: token,
      data: {
        company_id: e.company_id,
        name: e.name,
        address: e.address,
        max_desks: e.max_desks,
      },
    })
    .then((res) => {
      console.log('res', res);
      browserHistory.push('/admin/setting/space');
    })
    .catch((err) => {
      console.log('err', err);
    })
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div>
        AddSpace
        <br />
        <div>
          <form id="name" onSubmit={handleSubmit(this.submitData)}>
            <div>
              <label>Company Id</label>
              <div>
                <Field name="company_id" component="input" type="number" placeholder="Company_id" />
              </div>
            </div>
            <div>
              <label>Name</label>
              <div>
                <Field name="name" component="input" type="text" placeholder="Name" />
              </div>
            </div>
            <div>
              <label>Address</label>
              <div>
                <Field name="address" component="input" type="text" placeholder="Address" />
              </div>
            </div>
            <div>
              <label>Max Desks</label>
              <div>
                <Field name="max_desks" component="input" type="number" placeholder="Max_desks" />
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
      </div>
    );
  }
}

export default reduxForm({
  form: 'simple',
})(AddSpace);
