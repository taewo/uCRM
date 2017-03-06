import axios from 'axios';

import * as types from './types';


export const signUpEmail = email => ({
  type: types.SIGN_UP_EMAIL,
  email,
});

export function signUpSubmit() {
  return function(dispatch) {
    const API_URL = 'ucrmdbinstance.clmur04el56k.ap-northeast-2.rds.amazonaws.com';
    axios.post(`${API_URL}/signup/admin`)
    .then((res) => {
      dispatch({
        type: types.SIGN_UP_SUBMIT,
        res,
      });
    });
  };
}
