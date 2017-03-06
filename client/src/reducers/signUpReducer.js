import * as types from '../actions/types';

const initialState = {
  email: null,
};

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_UP_EMAIL: {
      return Object.assign({}, state, {
        email: action.email,
      });
    }

    default:
      return state;
  }
};




export default signUpReducer;
