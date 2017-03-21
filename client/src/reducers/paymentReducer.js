import * as types from '../actions/types';

const initialState = {
  payments: [],
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.EXPENSE_DATA:
      return {
        ...state,
        payments: action.payments,
      };
    default:
      return state;
  }
};

export default paymentReducer;
