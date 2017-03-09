import * as types from '../actions/types';

const initialState = {
  allMember: null,
  currentMember: null,
  latestActivity: null,
  roomReservation: null,
  isChangeDashboard: false,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DASHBOARD_ALLMEMBER_SHOW:
      return Object.assign({}, state, {
        allMember: action.allMember,
      });
    case types.DASHBOARD_CURRENTMEMBER_SHOW:
      return Object.assign({}, state, {
        currentMember: action.currentMember,
      });
    case types.DASHBOARD_LATESTACTIVITY_SHOW:
      return Object.assign({}, state, {
        latestActivity: action.latestActivity,
      });
    case types.DASHBOARD_ROOMRESERVE_SHOW:
      return Object.assign({}, state, {
        roomReservation: action.roomReservation,
      });
    case types.IS_DASHBOARD_SHOW:
      return Object.assign({}, state, {
        isChangeDashboard: action.isChangeDashboard,
      });
    default:
      return state;
  }
};

export default dashboardReducer;
