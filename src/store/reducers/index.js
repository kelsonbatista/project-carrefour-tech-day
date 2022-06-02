import { combineReducers } from "redux";
import loading from "./loadingReducer";
import products from "./productReducer";
import seller from "./sellerReducer";
import user from "./userReducer";

const rootReducer = combineReducers({
  seller,
  loading,
  products,
  user,
});

export default rootReducer;
