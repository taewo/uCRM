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
      token: localStorage.getItem('userToken'),
    };
    console.log(123, localStorage.getItem('userSpaceListId'));
    return axios({
      method: 'get',
      url: `${API_URL}/billplan`,
      params: { space_id: localStorage.getItem('userSpaceListId') },
      headers: token,
    })
    .then((res) => {
      console.log('res', res);
      dispatch(billPlanData(res.data));
    })
    .catch((err) => {
      console.log('err', err);
    });
  };
}
