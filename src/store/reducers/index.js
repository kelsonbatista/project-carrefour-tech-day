import { combineReducers } from "redux";
import loading from "./loadingReducer";
import products from "./productReducer";
import seller from "./sellerReducer";

const rootReducer = combineReducers({
  seller,
  loading,
  products,
});

export default rootReducer;
