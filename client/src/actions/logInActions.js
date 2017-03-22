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

        sessionStorage.setItem('userCompanyId', userCompanyId);

        if (res.data.space_list.length === 0) {
          if (sessionStorage.getItem('userToken')) {
            return reject('11 alredy logIn');
          }
          sessionStorage.setItem('userToken', userToken);
          return browserHistory.push('/space');
          /*
            return resolve('noSpaceList')
            TODO
            spaceList가 없을 때 add space로 Modal 이동하는 것 만들자
          */

        } else {
          const userSpaceList = JSON.stringify(res.data.space_list);

          if (sessionStorage.getItem('userToken')) {
            return reject('alredy logIn');
          }
          sessionStorage.setItem('userToken', userToken);
          sessionStorage.setItem('userSpaceList', userSpaceList);
          return resolve('hasSpaceList');
        }
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(isLogIn(false));
    });
  };
}
