import React from "react";
import "../../sass/ProductCounter.scss";
import { validateProductQuantity } from "../../redux/actions/products";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

const ProductCounter = ({ pid, min, max, isBlocked }) => {
  const summary = useSelector((state) => state.shoppingCart.summary);
  let quantity = 1;
  if (summary && summary.length > 0) {
    let product = summary.find((item) => item.pid === pid);
    quantity = product.quantity;
  }
  const dispatch = useDispatch();
  const handleDecrement = () => {
    return dispatch(validateProductQuantity(pid, min, max, quantity - 1));
  };
  const handleIncrement = () => {
    return dispatch(validateProductQuantity(pid, min, max, quantity + 1));
  };
  return (
    <div className="counter">
      <button
        className="counter__button"
        aria-label="decrement-value"
        onClick={debounce(handleDecrement, 1000)}
        disabled={isBlocked}
      >
        <span className="counter__text">-</span>
      </button>
      <span className="counter__text">{quantity}</span>
      <button
        className="counter__button"
        aria-label="increment-value"
        onClick={debounce(handleIncrement, 1000)}
        disabled={isBlocked}
      >
        <span className="counter__text">+</span>
      </button>
      <span className="counter__description">{`Obecnie masz ${quantity} sztuk produktu`}</span>
    </div>
  );
};
export default ProductCounter;
