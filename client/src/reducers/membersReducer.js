import * as types from '../actions/types';

const initialState = {
  members: [],
};

const membersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.MEMBERS_DATA:
      return {
        ...state,
        members: action.members
      };
    default:
      return state;
  }
};

export default membersReducer;
