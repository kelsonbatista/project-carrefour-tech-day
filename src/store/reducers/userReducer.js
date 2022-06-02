import { SET_USER } from "../actions/userAction";

const INITIAL_STATE = {
  user: {},
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
