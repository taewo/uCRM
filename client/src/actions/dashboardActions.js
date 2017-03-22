import axios from 'axios';
import { API_URL } from '../config';
import * as types from './types';

export const dashboardData = data => ({
  type: types.DASHBOARD_DATA,
  data,
});

export function dashboardShow() {
  return (dispatch) => {
    console.log('come in dashboardShow');
    const token = {
      token: sessionStorage.getItem('userToken'),
    };
    return axios({
      method: 'get',
      url: `${API_URL}/dashboard`,
      params: { space_id: sessionStorage.getItem('userSpaceListId') },
      headers: token,
    })
    .then((res) => {
      console.log(111, res.data);
      dispatch(dashboardData(res.data))
    });
  };
}
