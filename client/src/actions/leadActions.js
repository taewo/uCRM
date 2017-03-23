import axios from 'axios';
import * as types from './types';
import { API_URL } from '../config';

export const leadData = leads => ({
  type: types.LEAD_DATA,
  leads,
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
      const leads = res.data;
      dispatch(leadData(leads));
    })
    .catch((err) => {
      console.log('err', err);
    });
  };
}
