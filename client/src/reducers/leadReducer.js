import * as types from '../actions/types';

const initialState = {
  // data: null,
  // axiosGetData: false,
  leads: [],
};

const leadReducer = (state = initialState, action) => {
  switch (action.type) {
    // case types.LEAD_DATA:
    //   return Object.assign({}, state, {
    //     data: action.data,
    //   });
    // case types.LEAD_AXIOS_DATA_GET:
    //   return Object.assign({}, state, {
    //     axiosGetData: action.axiosGetData,
    //   });
    case types.LEAD_DATA:
      return {
        ...state,
        leads: action.leads,
      };
    default:
      return state;
  }
};

export default leadReducer;
