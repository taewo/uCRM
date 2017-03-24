import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { API_URL } from '../../config';
import axios from 'axios';

class AddBillPlan extends Component {
  constructor(props) {
    super(props);
    this.submitData = this.submitData.bind(this);
  }

  submitData(e) {
    console.log('data', e);
    const token = {
      token: sessionStorage.getItem('userToken'),
    };
    return axios({
      method: 'post',
      url: `${API_URL}/billplan`,
      headers: token,
      data: {
        space_id: sessionStorage.getItem('userSpaceListId'),
        name: e.name,
        cost: e.cost,
        isdaily: e.isDaily,
        duration: e.duration,
      },
    })
    .then((res) => {
      this.props.closeModal();
      console.log('res', res);
      this.props.billPlanShow();
    })
    .catch((err) => {
      console.log('err', err);
    })
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div>
        AddBillPlan
        <br />
        <div>
          <form id="name" onSubmit={handleSubmit(this.submitData)}>
            <div>
              <label>Name</label>
              <div>
                <Field name="name" component="input" type="text" placeholder="Name" />
              </div>
            </div>
            <div>
              <label>Cost</label>
              <div>
                <Field name="cost" component="input" type="number" placeholder="Cost" />
              </div>
            </div>
            <div>
              <label>Is Daily</label>
              <div>
                <label><Field name="isDaily" component="input" type="radio" value="true"/> True</label>
                <label><Field name="isDaily" component="input" type="radio" value="false"/> False</label>
              </div>
            </div>
            <div>
              <label>Duration</label>
              <div>
                <Field name="duration" component="input" type="number" placeholder="Duration" />
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
})(AddBillPlan);
