import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import signUpReducer from './signUpReducer';

const reducers = combineReducers({
  signUpReducer,
  routing: routerReducer,
});

export default reducers;
