import axios from 'axios';
import * as types from './types';
import { tokenChecker, API_URL } from '../config'

export const leadSpaceId = spaceId => ({
  type: types.LEAD_SPACE_ID_SHOW,
  spaceId,
});

export const leadType = typeLead => ({
  type: types.LEAD_TYPE_SHOW,
  typeLead,
});

export const leadName = name => ({
  type: types.LEAD_NAME_SHOW,
  name,
});

export const leadDate = date => ({
  type: types.LEAD_DATE_SHOW,
  date,
});

export const leadAxiosFinish = axiosGetData => ({
  type: types.LEAD_AXIOS_DATA_GET,
  axiosGetData,
});

export function leadShow() {
  return (dispatch, getState) => {
    console.log('come in lead page show');
    const { spaceId, leadType, name, date } = getState().leadReducer;
    const token = {
      token: localStorage.getItem('userToken'),
    };
    return axios({
      method: 'get',
      url: `${API_URL}/lead`,
      headers: token,
      params: { space_id: localStorage.getItem('userSpaceListId') },
    })
    .then((res) => {
      console.log('res', JSON.parse(res.data));
      dispatch(leadName(JSON.parse(res.data)));
      // console.log('res parse', JSON.parse(res.data));
    })
    .catch((err) => {
      console.log('err', err);
    });
  };
}
