import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import signUpReducer from './signUpReducer';
import logInReducer from './logInReducer';
import dashboardReducer from './dashboardReducer';

const reducers = combineReducers({
  signUpReducer,
  logInReducer,
  dashboardReducer,
  routing: routerReducer,
});

export default reducers;
