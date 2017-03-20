import { browserHistory } from 'react-router';

export function tokenChecker() {
  console.log('tokenChecker hello');
  const userToken = sessionStorage.getItem('userToken');
  console.log('tokenChecker', userToken);
  if (!userToken) {
    browserHistory.push('/');
  }
}

export const API_URL = 'http://localhost:4000/api';
