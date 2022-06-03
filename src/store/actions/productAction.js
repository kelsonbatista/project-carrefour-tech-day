export const SET_PRODUCTS = "SET_PRODUCTS";
export const SET_FILTER = "SET_FILTER";

export const setProducts = (payload) => ({
  type: SET_PRODUCTS,
  payload,
});

export const setFilter = (payload) => ({
  type: SET_FILTER,
  payload,
});
