import * as types from '../actions/types';

const initialState = {
  userid: null,
  password: null,
  toggleLogedIn: null,
};

const logInReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOG_IN_USERID:
      return Object.assign({}, state, {
        userid: action.userid,
      });
    case types.LOG_IN_PASSWORD:
      return Object.assign({}, state, {
        password: action.password,
      });
    case types.IS_LOG_IN:
      return Object.assign({}, state, {
        toggleLogedIn: action.toggleLogedIn,
      });
    default:
      return state;
  }
};

export default logInReducer;
