import * as types from '../actions/types';

const initialState = {
  payments: [],
  Id: null,
  billplan: [],
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PAYMENT_DATA:
      return {
        ...state,
        payments: action.payments,
      };
    case types.PAYMENT_MEMBER_ID:
      return {
        ...state,
        Id: action.Id,
      };
    case types.PAMENT_BILLPLAN_DATA:
      return {
        ...state,
        billplan: action.billplan,
      }
    default:
      return state;
  }
};

export default paymentReducer;
