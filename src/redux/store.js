import { createStore, applyMiddleware, combineReducers } from "redux";
import productsReducers from "./reducers/products";
import thunk from "redux-thunk";

export default createStore(
  combineReducers({
    shoppingCart: productsReducers,
  }),
  applyMiddleware(thunk)
);
