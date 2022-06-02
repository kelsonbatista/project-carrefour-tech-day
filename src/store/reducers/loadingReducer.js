import { SET_LOADING } from "../actions/loadingAction";

const INITIAL_STATE = {
  loading: true,
};

const loadingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOADING:
      return action.payload;
    default:
      return state;
  }
};

export default loadingReducer;
