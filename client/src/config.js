import { browserHistory } from 'react-router';
import axios from 'axios';

export function tokenChecker() {
  console.log('tokenChecker hello');
  const userToken = sessionStorage.getItem('userToken');
  console.log('tokenChecker', userToken);
  if (!userToken) {
    browserHistory.push('/');
    alert('로그인이 되어있지 않습니다. 로그인 해주세요!');
    return browserHistory.push('/');
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
    console.log(err);
        // console.log(err.response.data);
    // alert('비정상적인 접근입니다. 다시 로그인 해주세요!');
    // sessionStorage.clear();
    // return browserHistory.push('/');
  });
}

export const API_URL = 'http://localhost:4000/api';

export function commafy(num) {
  const str = num.toString().split('.');
  if (str[0].length >= 5) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
  if (str[1] && str[1].length >= 5) {
    str[1] = str[1].replace(/(\d{3})/g, '$1 ');
  }
  return str.join('.');
}
