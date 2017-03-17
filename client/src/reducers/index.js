import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import signUpReducer from './signUpReducer';
import logInReducer from './logInReducer';
import dashboardReducer from './dashboardReducer';
import leadReducer from './leadReducer';

const reducers = combineReducers({
  leadReducer,
  signUpReducer,
  logInReducer,
  dashboardReducer,
  routing: routerReducer,
  form: formReducer,
});

export default reducers;
