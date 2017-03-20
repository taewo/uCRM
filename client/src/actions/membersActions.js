import axios from 'axios';
// import { browserHistory } from 'react-router';
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
        token: localStorage.getItem('userToken'),
      },
    };
    const API_URL = 'http://localhost:4000/api';
    return axios({
      method: 'get',
      url: `${API_URL}/member`,
      params: {
        space_id: localStorage.getItem('userSpaceListId')
      },
      headers: instance.headers,
    })
      .then((res) => {
        const members = res.data;
        dispatch(membersData(members));
      });
  };
}

  //
  //
  //


  //   .then((res) => {
  //   });
