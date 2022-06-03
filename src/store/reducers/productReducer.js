import { SET_FILTER, SET_PRODUCTS } from "../actions/productAction";

const INITIAL_STATE = {
  products: [],
  filter: "",
};

const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.payload;
    case SET_FILTER:
      return action.payload;
    default:
      return state;
  }
};

export default productsReducer;
