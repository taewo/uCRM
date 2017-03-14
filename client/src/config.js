import { browserHistory } from 'react-router';

export function tokenChecker() {
  const userToken = localStorage.getItem('userToken');

  if (!userToken) {
    browserHistory.push('/');
  }
}

export const API_URL = 'http://localhost:4000/api';

export const instance = {
  headers: {
    token: localStorage.getItem('userToken'),
  },
}
