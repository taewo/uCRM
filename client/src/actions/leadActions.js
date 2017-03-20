import axios from 'axios';
import * as types from './types';
import { API_URL } from '../config';

export const leadData = data => ({
  type: types.LEAD_DATA,
  data,
});

export const leadAxiosFinish = axiosGetData => ({
  type: types.LEAD_AXIOS_DATA_GET,
  axiosGetData,
});

export function leadShow() {
  return (dispatch, getState) => {
    console.log('come in lead page show');
    const { data } = getState().leadReducer;
    const token = {
      token: sessionStorage.getItem('userToken'),
    };
    console.log(1);
    return axios({
      method: 'get',
      url: `${API_URL}/lead`,
      headers: token,
      params: { space_id: sessionStorage.getItem('userSpaceListId') },
    })
    .then((res) => {
      console.log('check',res)
      console.log('res', JSON.parse(res.data));
      const data = JSON.parse(res.data);
      console.log('data', data);
      dispatch(leadData(data));
    })
    .catch((err) => {
      console.log('err', err);
    });
  };
}
