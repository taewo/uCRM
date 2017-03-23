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
  return (dispatch) => {
    console.log('come in lead page show');
    const token = {
      token: sessionStorage.getItem('userToken'),
    };
    return axios({
      method: 'get',
      url: `${API_URL}/lead`,
      headers: token,
      params: { space_id: sessionStorage.getItem('userSpaceListId') },
    })
    .then((res) => {
      console.log(999, res)
      dispatch(leadData(res.data));
    })
    .catch((err) => {
      console.log('9999999  err');
      console.log('err', err);
    });
  };
}
