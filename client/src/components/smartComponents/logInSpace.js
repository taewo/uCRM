import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import axios from 'axios';
import { browserHistory } from 'react-router';

import { tokenChecker, API_URL } from '../../config';

const renderMembers = ({ fields }) => (
  <ul>
    <button type="button" onClick={() => fields.push()}>
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

class LogInSpace extends Component {

  constructor(props) {
    super(props);
    this.submitData = this.submitData.bind(this);
  }

  componentDidMount() {
    tokenChecker();
  }

  submitData(e) {
    const instance = {
      headers: {
        token: localStorage.getItem('userToken'),
      },
    };
    const data = Object.assign({}, e);
    const spaceData = data.space;
    axios.post(`${API_URL}/space`, {
      instance,
    },
    )
    .then((res) => {
      console.log('res', res);
      // browserHistory.push('/admin')
    })

  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div>
        <form id="LogInSpace" onSubmit={handleSubmit(this.submitData)}>
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
})(LogInSpace);
