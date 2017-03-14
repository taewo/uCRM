import axios from 'axios';
import { browserHistory } from 'react-router';
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

export const isSignUp = toggleSignedUp => ({
  type: types.IS_SIGN_UP,
  toggleSignedUp,
});

export function signUpSubmit() {
  return (dispatch, getState) => {
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
      dispatch(isSignUp(true));
      browserHistory.push('/');
    })
    .catch((err) => {
      dispatch(isSignUp(false));
      console.log('Sign up Error', err);
    });
  };
}
