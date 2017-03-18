import axios from 'axios';
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
  return (dispatch, getState) => {
    console.log('come in dashboardShow');
    const { allMember, currentMember, latestActivity, roomReservation } = getState().dashboardReducer;
    const API_URL = 'http://localhost:4000/api';
    const instance = {
      headers: {
        token: localStorage.getItem('userToken'),
      },
    };
    return axios({
      method: 'get',
      url: `${API_URL}/dashboard`,
      params: { space_id: localStorage.getItem('userSpaceListId') },
      headers: instance.headers,
    })
    .then((res) => {
      console.log(res.data);
      const data = res.data;
      const dataMemberList = data.memberList;
      const dataMemberListLength = dataMemberList.length;
      let countCurrentMember = 0;
      for (let i = 0; i < dataMemberListLength; i += 1) {
        if (dataMemberList[i].end_date === null) {
          countCurrentMember += 1;
        }
      }
      dispatch(dashboardAllMember(data.memberList.length));
      dispatch(dashboardCurrentMember(countCurrentMember));
      dispatch(dashboardLatestActivity(data.latestActivity));
      dispatch(dashboarRoomReservation(data.reservedList));
    });
  };
}
