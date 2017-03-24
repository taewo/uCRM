import * as types from '../actions/types';

const initialState = {
  members: [],
  memberId: null,
};

const membersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.MEMBERS_DATA:
      return {
        ...state,
        members: action.members,
      };
    case types.MEMBERS_ID:
      return {
        ...state,
        memberId: action.memberId,
      };
    default:
      return state;
  }
};

export default membersReducer;
