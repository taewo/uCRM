// import axios from 'axios';
// import { browserHistory } from 'react-router';
import * as types from './types';

export const dashboardAllMember = allMember => ({
  type: types.DASHBOARD_ALLMEMBER_SHOW,
  allMember,
});

export const dashboardCurrentMember = currentMember => ({
  type: types.DASHBOARD_CURRENTMEMBER_SHOW,
  currentMember,
});

export const dashboardLatestActivity = latestActivity => ({
  type: types.DASHBOARD_LATESTACTIVITY_SHOW,
  latestActivity,
});

export const dashboarRoomReservation = roomReservation => ({
  type: types.DASHBOARD_ROOMRESERVE_SHOW,
  roomReservation,
});

export const dashboardIsChangeDashboard = isChangeDashboard => ({
  type: types.IS_DASHBOARD_SHOW,
  isChangeDashboard,
});

export function dashboardShow() {
  return (dispatch) => {
    console.log('come in dashboardShow');

    // function Dashboard Current Member
    const dataMemberList = data.memberList;
    let countCurrentMember = 0;
    for (let i = 0; i < dataMemberList.length; i += 1) {
      if (dataMemberList[i].end_date === null) {
        countCurrentMember += 1;
      }
    }
    dispatch(dashboardAllMember(data.memberList.length));
    dispatch(dashboardCurrentMember(countCurrentMember));
    dispatch(dashboardLatestActivity(data.latestActivity));
    dispatch(dashboarRoomReservation(data.reservedList));
  };
}
