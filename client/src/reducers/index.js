import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import signUpReducer from './signUpReducer';
import logInReducer from './logInReducer';


const reducers = combineReducers({
  signUpReducer,
  logInReducer,
  routing: routerReducer,
});

export default reducers;
