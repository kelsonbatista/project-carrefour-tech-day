export const SET_PRODUCTS = "SET_PRODUCTS";
export const SET_FILTER = "SET_FILTER";
export const SET_CART = "SET_CART";

export const setProducts = (payload) => ({
  type: SET_PRODUCTS,
  payload,
});

export const setFilter = (payload) => ({
  type: SET_FILTER,
  payload,
});

export const setCart = (payload) => ({
  type: SET_CART,
  payload,
});
