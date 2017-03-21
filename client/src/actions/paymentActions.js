import axios from 'axios';
import { API_URL } from '../config';
import * as types from './types';

export const paymentData = payments => ({
  type: types.PAYMENT_DATA,
  payments,
});

export function paymentShow() {
  return (dispatch) => {
    console.log('come in paymentShow');
    const instance = {
      headers: {
        token: sessionStorage.getItem('userToken'),
      },
    };
    return axios({
      method: 'get',
      url: `${API_URL}/payment`,
      params: {
        space_id: sessionStorage.getItem('userSpaceListId'),
      },
      headers: instance.headers,
    })
    .then((res) => {
      console.log(res);
      const payments = res.data;
      dispatch(paymentData(payments));
    })
    .catch((err) => {
      console.log('err', err);
    });
  };
}

  //
  //
  //


  //   .then((res) => {
  //   });
