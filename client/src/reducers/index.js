import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import signUpReducer from './signUpReducer';
import logInReducer from './logInReducer';
import dashboardReducer from './dashboardReducer';
import leadReducer from './leadReducer';
import spaceReducer from './spaceReducer';
import billPlanReducer from './billPlanReducer';
import membersReducer from './membersReducer';
import basicReducer from './basicReducer';
import expenseReducer from './expenseReducer';
import paymentReducer from './paymentReducer';

const reducers = combineReducers({
  basicReducer,
  billPlanReducer,
  spaceReducer,
  leadReducer,
  signUpReducer,
  logInReducer,
  dashboardReducer,
  membersReducer,
  expenseReducer,
  paymentReducer,
  routing: routerReducer,
  form: formReducer,
});

export default reducers;
