import * as types from '../actions/types';

const initialState = {
  email: null,
  mobile: null,
  name: null,
  password: null,
  userid: null,
  companyname: null,
  toggleSignedUp: false,
};

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_UP_EMAIL:
      return Object.assign({}, state, {
        email: action.email,
      });
    case types.SIGN_UP_MOBILE:
      return Object.assign({}, state, {
        mobile: action.mobile,
      });
    case types.SIGN_UP_NAME:
      return Object.assign({}, state, {
        name: action.name,
      });
    case types.SIGN_UP_PASSWORD:
      return Object.assign({}, state, {
        password: action.password,
      });
    case types.SIGN_UP_USERID:
      return Object.assign({}, state, {
        userid: action.userid,
      });
    case types.SIGN_UP_COMPANYNAME:
      return Object.assign({}, state, {
        companyname: action.companyname,
      });
    case types.IS_SIGN_UP:
      return Object.assign({}, state, {
        toggleSignedUp: action.toggleSignedUp,
      });
    default:
      return state;
  }
};

export default signUpReducer;
