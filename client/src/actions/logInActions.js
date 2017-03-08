import axios from 'axios';
import * as types from './types';

export const logInUserId = userid => ({
  type: types.LOG_IN_USERID,
  userid,
});

export const logInPassword = password => ({
  type: types.LOG_IN_PASSWORD,
  password,
});

export function logInConfirm () {
  return (dispatch, getState) => {
    console.log('1');
    const { userid, password } = getState().logInReducer;
    const API_URL = 'http://localhost:4000/api';
    return axios.post(`${API_URL}/login`, {
      userid,
      password,
    })
    .then((res) => {
      console.log('res', res);
      dispatch({
        type: types.LOG_IN_CONFIRM,
        res,
      });
    })
    .catch((err) => {
      console.log('Sign up Error', err);
    });
  };
}
