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
    console.log(111)
    const { userid, password } = getState().logInReducer;
    const API_URL = 'http://localhost:4000/api';
    return axios.post(`${API_URL}/login`, {
      userid,
      password,
    })
    .then((res) => {
      console.log(2222)
      return new Promise((resolve, reject) => {
        console.log('res',res.data);
        dispatch(isLogIn(true));
        const userType = res.data.type;
        const userToken = res.data.token;
        const userSpaceList = [];
        userSpaceList.push(res.data.space_list);
        userSpaceList.slice(1, userSpaceList.length-1);
        console.log(typeof userSpaceList);
        const userSpaceListId = userSpaceList[0];
        console.log(userSpaceListId);
        const userSpaceListChecker = userSpaceList.length;
        console.log(userSpaceListChecker);
        if (localStorage.getItem('userToken')) {
          return reject('alredy logIn')
        }

        localStorage.setItem('userType', userType);
        localStorage.setItem('userToken', userToken);
        localStorage.setItem('userSpaceListId', userSpaceListId);
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
