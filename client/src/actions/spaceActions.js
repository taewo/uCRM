import axios from 'axios';
import * as types from './types';
import { API_URL } from '../config';

export const spaceData = data => ({
  type: types.SPACE_DATA,
  data,
});

export const spaceAxiosFinish = axiosGetData => ({
  type: types.SPACE_AXIOS_DATA_GET,
  axiosGetData,
})

export function spaceShow() {
  return (dispatch) => {
    console.log('come in space page show');
    const token = {
      token: localStorage.getItem('userToken'),
    };
    return axios({
      method: 'get',
      url: `${API_URL}/space`,
      headers: token,
      // params: { space_id: localStorage.getItem('userSpaceListId') },
    })
    .then((res) => {
      console.log('res.data', res.data);
      dispatch(spaceData(res.data));
    })
    .catch((err) => {
      console.log('err', err);
    });
  };
}
