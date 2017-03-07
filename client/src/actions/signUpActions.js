import axios from 'axios';

import * as types from './types';


export const signUpEmail = email => ({
  type: types.SIGN_UP_EMAIL,
  email,
});

export const isSignedIn = toggleSignedIn => ({
  type: types.IS_SIGN_IN,
  toggleSignedIn,
});

export function signUpSubmit() {
  return (dispatch, getState) => {
    console.log('1');
    const { email } = getState().signUpReducer;
    const API_URL = 'http://localhost:4000/api';
    axios.post(`${API_URL}/signup/admin`, {
      email,
    })
    .then((res) => {
      console.log('1');
      dispatch({
        type: types.SIGN_UP_SUBMIT,
        res,
      });
    });
  };
}
