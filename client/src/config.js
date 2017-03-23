import { browserHistory } from 'react-router';
import axios from 'axios';

export const API_URL = 'http://localhost:4000/api';
export function tokenChecker() {
  console.log('tokenChecker hello');
  const userToken = sessionStorage.getItem('userToken');
  if (!userToken) {
    browserHistory.push('/');
  }
  return axios({
    method: 'get',
    url: `${API_URL}/token`,
    headers: userToken,
  })
  .then((res) => {
    console.log('check successful', res);
  })
  .catch((err) => {
    browserHistory.push('/');
  });
}
