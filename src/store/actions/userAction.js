export const SET_USER = "SET_USER";
export const SET_NEW_POSTAL_CODE = "SET_NEW_POSTAL_CODE";

export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});

export const setNewPostalCode = (payload) => ({
  type: SET_NEW_POSTAL_CODE,
  payload,
});
