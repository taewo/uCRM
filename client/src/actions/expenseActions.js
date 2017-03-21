import axios from 'axios';
import { API_URL } from '../config';
import * as types from './types';

export const expenseData = expenses => ({
  type: types.EXPENSE_DATA,
  expenses,
});

export function expenseShow() {
  return (dispatch) => {
    console.log('come in expenseShow');
    const instance = {
      headers: {
        token: sessionStorage.getItem('userToken'),
      },
    };
    return axios({
      method: 'get',
      url: `${API_URL}/expense`,
      params: {
        space_id: sessionStorage.getItem('userSpaceListId'),
      },
      headers: instance.headers,
    })
    .then((res) => {
      console.log(res);
      const expenses = res.data;
      dispatch(expenseData(expenses));
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
