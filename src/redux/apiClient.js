import {
  changeProductQuantity,
  getProductsFailed,
  getProductsSucceeded,
} from "./actions/products";

export const getShoppingCart = (dispatch) => {
  fetch("/api/cart")
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        dispatch(getProductsFailed("Some error happened"));
      }
    })
    .then((data) => {
      dispatch(getProductsSucceeded(data));
    })
    .catch(() => dispatch(getProductsFailed("Some error happened")));
};

export const checkProductQuantity = (dispatch, pid, min, max, quantity) => {
  fetch("/api/product/check", {
    method: "POST",
    body: JSON.stringify({
      pid,
      quantity,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (!data.isError) {
        dispatch(changeProductQuantity(pid, min, max, quantity));
      } else {
        // in case of error force update to minimum quantity
        dispatch(changeProductQuantity(pid, min, max, min));
      }
    })
    .catch((e) => console.log(e));
};
