import {
  SET_CART,
  SET_CART_OPEN,
  SET_CART_TOTAL,
  SET_FILTER,
  SET_PRODUCTS,
} from "../actions/productAction";

const INITIAL_STATE = {
  list: [],
  filter: "",
  cart: [],
  cartTotal: [],
  cartOpen: false,
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
    case SET_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case SET_CART_TOTAL:
      return {
        ...state,
        cartTotal: action.payload,
      };
    case SET_CART_OPEN:
      return {
        ...state,
        cartOpen: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
