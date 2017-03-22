import * as types from '../actions/types';

const initialState = {
  data: null,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DASHBOARD_DATA:
      return Object.assign({}, state, {
        data: action.data,
      });
    default:
      return state;
  }
};

export default dashboardReducer;
