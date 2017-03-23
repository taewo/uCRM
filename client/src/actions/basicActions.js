import * as types from './types';
import axios from 'axios';
import { API_URL } from '../config';

export const basicData = data => ({
  type: types.BASIC_DATA,
  data,
});

export const basicAxiosFinish = axiosGetData => ({
  type: types.BASIC_AXIOS_DATA_GET,
  axiosGetData,
});

export function basicShow() {
  return (dispatch) => {
    console.log('come in basic page');
    const token = {
      token: sessionStorage.getItem('userToken'),
    };
    return axios({
      method: 'get',
      url: `${API_URL}/basic`,
      params: { space_id: sessionStorage.getItem('userSpaceListId') },
      headers: token,
    })
    .then((res) => {
      console.log('res22332', res.data);
      dispatch(basicData(res.data));
    })
    .catch((err) => {
      console.log('err', err);
    });
  };
}
