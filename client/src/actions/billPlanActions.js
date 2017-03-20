import axios from 'axios';
import * as types from './types';
import { API_URL } from '../config';

export const billPlanData = data => ({
  type: types.BILLPLAN_DATA,
  data,
});

export const billPlanAxiosFinish = axiosGetData => ({
  type: types.BILLPLAN_AXIOS_DATA_GET,
  axiosGetData,
});

export function billPlanShow() {
  return (dispatch) => {
    console.log('come in billplan page');
    const token = {
      token: sessionStorage.getItem('userToken'),
    };
    const userSpaceListId = sessionStorage.getItem('userSpaceListId');
    return axios({
      method: 'get',
      url: `${API_URL}/billplan`,
      params: { space_id: userSpaceListId },
      headers: token,
    })
    .then((res) => {
      console.log('res12', res.data);
      dispatch(billPlanData(res.data));
    })
    .catch((err) => {
      console.log('err', err);
    });
  };
}
