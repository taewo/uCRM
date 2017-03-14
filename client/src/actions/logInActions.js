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
      return new Promise((resolve, reject) => {
        console.log(res);
        dispatch(isLogIn(true));
        const userType = res.data.type;
        const userToken = res.data.token;
        if (localStorage.getItem('userToken')) {
          return reject('melon')
        }
        console.log(1,userType);
        console.log(2,userToken);
        localStorage.setItem('userType', userType);
        localStorage.setItem('userToken', userToken);
        return userType === 'comp' ? resolve(browserHistory.push('/admin/manage/dashboard')) : resolve(browserHistory.push('/staff'));
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(isLogIn(false));
    });
  };
}
