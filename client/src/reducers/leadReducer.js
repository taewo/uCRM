import * as types from '../actions/types';

const initialState = {
  data: null,
  axiosGetData: false,
};

const leadReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LEAD_DATA:
      return Object.assign({}, state, {
        date: action.data,
      });
    case types.LEAD_AXIOS_DATA_GET:
      return Object.assign({}, state, {
        axiosGetData: action.axiosGetData,
      });
    default:
      return state;
  }
};

export default leadReducer;
