import * as types from '../actions/types';

const initialState = {
  expenses: [],
};

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.MEMBERS_DATA:
      return {
        ...state,
        expenses: action.expenses,
      };
    default:
      return state;
  }
};

export default expenseReducer;
