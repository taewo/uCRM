import axios from 'axios';
import { browserHistory } from 'react-router';
import * as types from './types';
import data from '../../data.json';

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

export function dashboardShow () {
  return (dispatch) => {
    console.log('1')
    console.log(data);
    dispatch(dashboardAllMember(data.memberList.length))
    dispatch(dashboardCurrentMember())
  }
}
