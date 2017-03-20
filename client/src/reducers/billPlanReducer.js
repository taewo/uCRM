import * as types from '../actions/types';

const initialState = {
  data: null,
  axiosGetData: false,
};

const billPlanReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.BILLPLAN_DATA:
      return Object.assign({}, state, {
        data: action.data,
      });
    case types.BILLPLAN_AXIOS_DATA_GET:
      return Object.assign({}, state, {
        axiosGetData: action.axiosGetData,
      });
    default:
      return state;
  }
};

export default billPlanReducer;
