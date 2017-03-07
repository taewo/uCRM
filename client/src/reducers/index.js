import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import signUpReducer from './signUpReducer';
// Test***********
import signUpSubmit from './signUpSubmit';

const reducers = combineReducers({
  signUpSubmit,
  signUpReducer,
  routing: routerReducer,
});

export default reducers;
