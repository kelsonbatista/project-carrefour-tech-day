import { SET_FILTER, SET_PRODUCTS } from "../actions/productAction";

const INITIAL_STATE = {
  list: [],
  filter: "",
};

const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        list: action.payload,
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
