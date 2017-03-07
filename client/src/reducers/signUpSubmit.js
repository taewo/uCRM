// Tetst***********

import * as types from '../actions/types';

const initialState = {
  data: null,
};

export const signUpSubmit = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_UP_SUBMIT: {
      return Object.assign({}, state, {
        data: action.data,
      });
    }
    default:
      return state;
  }
};

export default signUpSubmit;
