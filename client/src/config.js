import { browserHistory } from 'react-router';

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
    sessionStorage.clear();
    alert('비정상적인 접근입니다. 다시 로그인 해주세요!');
    return browserHistory.push('/');
  });
}

export const API_URL = 'http://localhost:4000/api';
