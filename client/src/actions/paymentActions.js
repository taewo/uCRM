import axios from 'axios';
import { API_URL } from '../config';
import * as types from './types';

export const paymentData = payments => ({
  type: types.PAYMENT_DATA,
  payments,
});

export const paymentMemberId = Id => ({
  type: types.PAYMENT_MEMBER_ID,
  Id,
});

export const paymentBillplanData = billplan => ({
  type: types.PAYMENT_BILLPLAN_DATA,
  billplan,
});

export const paymentMemberData = memberData => ({
  type: types.PAYMENT_MEMBER_DATA,
  memberData,
});

export function paymentDataShow() {
  return (dispatch) => {
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
      const memberData = res.data;
      console.log(memberData);
      dispatch(paymentMemberData(memberData));
    })
  }
}

export function paymentShow() {
  return (dispatch) => {
    console.log('come in paymentShow');
    const instance = {
      headers: {
        token: sessionStorage.getItem('userToken'),
      },
    };
    const getSpacePayment = axios({
      method: 'get',
      url: `${API_URL}/space/payment`,
      params: {
        space_id: sessionStorage.getItem('userSpaceListId'),
      },
      headers: instance.headers,
    });
    const getBillPlan = axios({
      method: 'get',
      url: `${API_URL}/billplan`,
      params: {
        space_id: sessionStorage.getItem('userSpaceListId'),
      },
      headers: instance.headers,
    });
    return Promise.all([getSpacePayment, getBillPlan])
    .then((res) => {
      const payments = res[0].data;
      const billplan = res[1].data;
      dispatch(paymentData(payments));
      dispatch(paymentBillplanData(billplan));
    })
    .catch((err) => {
      console.log('err', err);
    });
  };
}
