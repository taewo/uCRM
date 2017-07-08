import axios from 'axios';
import { browserHistory } from 'react-router';
import * as types from './types';
import { API_URL } from '../config';

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
    return axios.post(`${API_URL}/login`, {
      userid,
      password,
    })
    .then((res) => {
      dispatch(isLogIn(true));
      const userType = res.data.type;
      const userToken = res.data.token;
      const userCompanyId = res.data.company_id;

      sessionStorage.setItem('userCompanyId', userCompanyId);

      if (res.data.space_list.length === 0) {
        if (sessionStorage.getItem('userToken')) {
          throw new Error('11 alredy logIn');
        }
        sessionStorage.setItem('userToken', userToken);
        return browserHistory.push('/space');
        /*
          return resolve('noSpaceList')
          TODO
          spaceList가 없을 때 add space로 Modal 이동하는 것 만들자

          TODO
          spaceList가 있을때와 없을 때 구분하는 함수 만들기
        */
      } else {
        const userSpaceList = JSON.stringify(res.data.space_list);

        if (sessionStorage.getItem('userToken')) {
          throw new Error('alredy logIn');
        }
        sessionStorage.setItem('userToken', userToken);
        sessionStorage.setItem('userSpaceList', userSpaceList);
        return 'hasSpaceList';
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch(isLogIn(false));
    });
  };
}
