import * as types from '../actions/types';

const initialState = {
  spaceId: null,
  typeLead: null,
  name: null,
  date: null,
  axiosGetData: false,
};

const leadReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LEAD_SPACE_ID_SHOW:
      return Object.assign({}, state, {
        spaceId: action.spaceId,
      });
    case types.LEAD_TYPE_SHOW:
      return Object.assign({}, state, {
        typeLead: action.typeLead,
      });
    case types.LEAD_NAME_SHOW:
      return Object.assign({}, state, {
        name: action.name,
      });
    case types.LEAD_DATE_SHOW:
      return Object.assign({}, state, {
        date: action.date,
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
