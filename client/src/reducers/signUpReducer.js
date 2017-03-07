import * as types from '../actions/types';

const initialState = {
  email: null,
};

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_UP_EMAIL:
      return Object.assign({}, state, {
        email: action.email,
      });
    case types.IS_SIGN_IN:
      return Object.assign({}, state, {
        toggleSignedIn: action.toggleSignedIn,
      });

    default:
      return state;
  }
};

export default signUpReducer;
