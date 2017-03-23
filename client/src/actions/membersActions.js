import axios from 'axios';
import { API_URL } from '../config';
import * as types from './types';

export const membersData = members => ({
  type: types.MEMBERS_DATA,
  members,
});

export function membersShow() {
  return (dispatch, getState) => {
    console.log('come in membersShow');
    const instance = {
      headers: {
        token: sessionStorage.getItem('userToken'),
      },
    };
    return axios({
      method: 'get',
      url: `${API_URL}/member`,
      params: {
        space_id: sessionStorage.getItem('userSpaceListId'),
      },
      headers: instance.headers,
    })
    .then((res) => {
      const members = res.data;
      dispatch(membersData(members));
    })
    .catch((err) => {
      console.log('err', err);
    })
  };
}
