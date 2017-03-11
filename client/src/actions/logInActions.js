import axios from 'axios';
import { browserHistory } from 'react-router';
import * as types from './types';

export const logInUserId = userid => ({
  type: types.LOG_IN_USERID,
  userid,
});

export const logInPassword = password => ({
  type: types.LOG_IN_PASSWORD,
  password,
});

export const isLogIn = toggleLogedIn => ({
  type: types.IS_LOG_IN,
  toggleLogedIn,
});

export function logInConfirm () {
  return (dispatch, getState) => {
    const { userid, password } = getState().logInReducer;
    const API_URL = 'http://localhost:4000/api';
    return axios.post(`${API_URL}/login`, {
      userid,
      password,
    })
    .then((res) => {
      console.log(res);
      dispatch(isLogIn(true));
      const userData = JSON.parse(res.request.response);
      localStorage.setItem('userData', JSON.stringify(userData));
      const userDataLocal = JSON.parse(localStorage.getItem('userData'));
      const userType = userDataLocal.type;
      userType === 'comp' ? browserHistory.push('/admin/manage/dashboard') : browserHistory.push('/staff');
    })
    .catch((err) => {
      console.log(err);
      dispatch(isLogIn(false));
    });
  };
}
