import * as types from '../actions/types';

const initialState = {
  data: null,
  axiosGetData: false,
};

const spaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SPACE_DATA:
      return Object.assign({}, state, {
        data: action.data,
      });
    case types.SPACE_AXIOS_DATA_GET:
      return Object.assign({}, state, {
        axiosGetData: action.axiosGetData,
      });
    default:
      return state;
  }
}

export default spaceReducer;
