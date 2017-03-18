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
        dispatch(isLogIn(true));
        const userType = res.data.type;
        const userToken = res.data.token;
        const userCompanyId = res.data.company_id;
        console.log(res.data.company_id);

        localStorage.setItem('userCompanyId', userCompanyId);

        if (res.data.space_list.length === 0) {
          if (localStorage.getItem('userToken')) {
            return reject('11 alredy logIn');
          }
          localStorage.setItem('userToken', userToken);
          return resolve(browserHistory.push('/space'))

        } else {
          const userSpaceList = JSON.stringify(res.data.space_list);

          console.log(typeof userSpaceList);
          console.log(userSpaceList);
          if (localStorage.getItem('userToken')) {
            return reject('alredy logIn');
          }
          localStorage.setItem('userToken', userToken);
          localStorage.setItem('userSpaceList', userSpaceList);
          return resolve(browserHistory.push('/selectspace'));
        }
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(isLogIn(false));
    });
  };
}
