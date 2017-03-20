import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import signUpReducer from './signUpReducer';
import logInReducer from './logInReducer';
import dashboardReducer from './dashboardReducer';
import leadReducer from './leadReducer';
import spaceReducer from './spaceReducer';
import membersReducer from './membersReducer';

const reducers = combineReducers({
  spaceReducer,
  leadReducer,
  signUpReducer,
  logInReducer,
  dashboardReducer,
  membersReducer,
  routing: routerReducer,
  form: formReducer,
});

export default reducers;
