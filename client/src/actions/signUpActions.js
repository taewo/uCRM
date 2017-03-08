import axios from 'axios';

import * as types from './types';

export const signUpEmail = email => ({
  type: types.SIGN_UP_EMAIL,
  email,
});

export const signUpMobile = mobile => ({
  type: types.SIGN_UP_MOBILE,
  mobile,
});

export const signUpName = name => ({
  type: types.SIGN_UP_NAME,
  name,
});

export const signUpPassword = password => ({
  type: types.SIGN_UP_PASSWORD,
  password,
});

export const signUpUserid = userid => ({
  type: types.SIGN_UP_USERID,
  userid,
});

export const signUpCompanyname = companyname => ({
  type: types.SIGN_UP_COMPANYNAME,
  companyname,
});

export function signUpSubmit() {
  return (dispatch, getState) => {
    console.log('1');
    const { email, mobile, name, password, userid, companyname } = getState().signUpReducer;
    const API_URL = 'http://localhost:4000/api';
    return axios.post(`${API_URL}/signup/admin`, {
      companyname,
      userid,
      password,
      name,
      mobile,
      email,
    })
    .then((res) => {
      console.log('res', res);
      dispatch({
        type: types.SIGN_UP_SUBMIT,
        res,
      });
    })
    .catch((err) => {
      console.log('Sign up Error', err);
    });
  };
}
