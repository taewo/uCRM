import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import axios from 'axios';
import { browserHistory } from 'react-router';

import { tokenChecker, API_URL } from '../../config';

const renderMembers = ({ fields }) => (
  <ul>
    <button type="button" onClick={() => {
        console.log(1);
      const instance = {
        headers: {
          token: localStorage.getItem('userToken'),
        },
      };
      fields.push();
      axios({
        method: 'get',
        url: `${API_URL}/space`,
        headers: instance.headers,
      })
      .then((res) => {
        console.log(res);
      });
    }}
    >
      Add Information</button>
    {fields.map((space, index) =>
      <li key={index}>
        <h4>Space #{index + 1}</h4>
        <Field
          name={`${space}.Name`}
          type="text"
          component="input"
          placeholder="Name"
        />
        <Field
          name={`${space}.Address`}
          type="text"
          component="input"
          placeholder="Address"
        />
        <Field
          name={`${space}.Max_desks`}
          type="text"
          component="input"
          placeholder="Max_desks"
        />
        <button
          type="button"
          title="Remove Information"
          onClick={() => fields.remove(index)}
        >
          Delete Information
        </button>
      </li>,
    )}
  </ul>
);

class AddSpace extends Component {

  constructor(props) {
    super(props);
    this.submitData = this.submitData.bind(this);
  }

  submitData(e) {
    const instance = {
      headers: {
        token: localStorage.getItem('userToken'),
      },
    };
    const userCompanyId = localStorage.getItem('userCompanyId');
    const data = Object.assign({}, e);
    const spaceData = data.space[0];
    console.log(spaceData);
    axios({
      method: 'post',
      url: `${API_URL}/space`,
      headers: instance.headers,
      data: {
        name: spaceData.Name,
        address: spaceData.Address,
        max_desks: spaceData.Max_desks,
        company_id: userCompanyId,
      },
    })
    .then((res) => {
      console.log('res', res);
      browserHistory.push('/admin')
    })
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div>
        <form id="AddSpace" onSubmit={handleSubmit(this.submitData)}>
          <FieldArray name="space" component={renderMembers} />
          <div>
            <button type="submit" disabled={submitting}>Submit</button>
            <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'fieldArrays',
})(AddSpace);
