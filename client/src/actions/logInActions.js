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

export function logInConfirm() {
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
        const userSpaceList = res.data.space_list;
        const userSpaceListChecker = userSpaceList.length;
        console.log(userSpaceListChecker);
        if (localStorage.getItem('userToken')) {
          return reject('alredy logIn')
        }

        localStorage.setItem('userType', userType);
        localStorage.setItem('userToken', userToken);
        return (userType === 'comp' && userSpaceListChecker === 2) ?
        resolve(browserHistory.push('/space'))
        : resolve(browserHistory.push('/admin/manage/dashboard'));
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(isLogIn(false));
    });
  };
}
