import { SET_PRODUCT_SELLER } from "../actions/sellerAction";

const INITIAL_STATE = {
  seller: [],
};

const sellerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PRODUCT_SELLER:
      return action.payload;
    default:
      return state;
  }
};

export default sellerReducer;
