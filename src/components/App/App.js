import React, { useEffect } from "react";
import "../../sass/App.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  validateProductQuantity,
} from "../../redux/actions/products";
import ProductCounter from "../Products/ProductCounter";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const products = useSelector((state) => state.shoppingCart.products);
  const summary = useSelector((state) => state.shoppingCart.summary);
  if (products.loading) {
    return (
      <div className="centered-container">
        <span>Loading...</span>
      </div>
    );
  }
  if (products.error) {
    return (
      <div className="centered-container">
        <span>{products.error}</span>
      </div>
    );
  }
  const calculateProductsSummary = () => {
    if (summary && summary.length > 0) {
      const initialValue = 0;
      const productsSummary = summary.reduce((acc, curr) => {
        return acc + parseFloat(curr.price) * curr.quantity;
      }, initialValue);
      return (
        <div className="products__summary">
          <span>Podsumowanie</span>
          <span>{`${productsSummary.toFixed(2)} zł`}</span>
        </div>
      );
    }
  };
  const handleUpdateQuantity = (pid, min, max, quantity) => {
    return dispatch(validateProductQuantity(pid, min, max, quantity));
  };
  const renderProductItem = (product) => {
    if (summary && summary.length > 0) {
      const { quantity } = summary.find((item) => item.pid === product.pid);
      const { pid, min, max, isBlocked } = product;
      return (
        <li className="products-list__row" key={product.pid}>
          <span className="products-list__name">{product.name}</span>
          <ProductCounter
            pid={pid}
            min={min}
            max={max}
            isBlocked={isBlocked}
            quantity={quantity}
            handleUpdateQuantity={handleUpdateQuantity}
          />
          <span className="products-list__price">{`${product.price} zł`}</span>
        </li>
      );
    }
  };
  const hasProducts = products && products.list && products.list.length > 0;
  return (
    <div className="container">
      <div className="products">
        <h3 className="products__title">Lista produktów</h3>
        <ul className="products-list">
          {hasProducts ? (
            products.list.map((product) => renderProductItem(product))
          ) : (
            <div className="centered-container">Twój koszyk jest pusty</div>
          )}
        </ul>
        {calculateProductsSummary()}
      </div>
    </div>
  );
};

export default App;
