import { checkProductQuantity, getShoppingCart } from "../apiClient";

export const GET_PRODUCTS_STARTED = "GET_PRODUCTS_STARTED";
export const GET_PRODUCTS_SUCCEEDED = "GET_PRODUCTS_SUCCEEDED";
export const GET_PRODUCTS_FAILED = "GET_PRODUCTS_FAILED";
export const CHANGE_PRODUCT_QUANTITY = "CHANGE_PRODUCT_QUANTITY";

export const getProductsStarted = () => {
  return {
    type: GET_PRODUCTS_STARTED,
  };
};

export const getProductsSucceeded = (products) => {
  return {
    type: GET_PRODUCTS_SUCCEEDED,
    payload: {
      products,
    },
  };
};

export const getProductsFailed = (error) => {
  return {
    type: GET_PRODUCTS_FAILED,
    error: error,
  };
};

export const changeProductQuantity = (pid, min, max, quantity) => {
  return {
    type: CHANGE_PRODUCT_QUANTITY,
    payload: {
      pid,
      min,
      max,
      quantity,
    },
  };
};
export const getProductsRequest = () => {
  return (dispatch) => {
    dispatch(getProductsStarted());
    getShoppingCart(dispatch);
  };
};
export const validateProductQuantity = (pid, min, max, quantity) => {
  return (dispatch) => {
    checkProductQuantity(dispatch, pid, min, max, quantity);
  };
};
