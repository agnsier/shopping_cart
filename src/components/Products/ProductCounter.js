import React from "react";
import "../../sass/ProductCounter.scss";
import { debounce } from "lodash";

const ProductCounter = ({
  pid,
  min,
  max,
  isBlocked,
  quantity,
  handleUpdateQuantity,
}) => {
  return (
    <div className="counter">
      <button
        className="counter__button"
        aria-label="decrement-value"
        onClick={debounce(
          () => handleUpdateQuantity(pid, min, max, quantity - 1),
          1000
        )}
        disabled={isBlocked}
      >
        <span className="counter__text">-</span>
      </button>
      <span className="counter__text">{quantity}</span>
      <button
        className="counter__button"
        aria-label="increment-value"
        onClick={debounce(
          () => handleUpdateQuantity(pid, min, max, quantity + 1),
          1000
        )}
        disabled={isBlocked}
      >
        <span className="counter__text">+</span>
      </button>
      <span className="counter__description">{`Obecnie masz ${quantity} sztuk produktu`}</span>
    </div>
  );
};
export default ProductCounter;
