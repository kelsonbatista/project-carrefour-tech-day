import { SET_NEW_POSTAL_CODE, SET_USER } from "../actions/userAction";

const INITIAL_STATE = {
  borough: "",
  city: "",
  postalcode: "",
  newPostalCode: "",
  country: "",
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case SET_NEW_POSTAL_CODE:
      return {
        ...state,
        newPostalCode: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
