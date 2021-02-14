import React from "react";
import '../../sass/ProductCounter.scss';
import {checkRequest} from "../../redux/actions/products";
import {useDispatch, useSelector} from "react-redux";
import {debounce} from "lodash"
const ProductCounter = ({pid, min, max, isBlocked}) =>{
    const summary = useSelector(state => state.shoppingCart.summary)
    let amount = 1;
    if(summary && summary.length > 0 ){
        let product = summary.find((item) => item.pid === pid)
        amount = product.amount
    }
    const dispatch = useDispatch();
    const handleDecrement = () => {
        return dispatch(checkRequest(pid, min,max, amount - 1))
    }
    const handleIncrement = () => {
        return dispatch(checkRequest(pid, min,max, amount + 1))
    }
    return(
        <div className="counter">
            <button className="counter__button" aria-label="decrement-value" onClick={debounce(handleDecrement, 1000)} disabled={isBlocked}>
                <span className="counter__text">-</span>
            </button>
            <span className="counter__text">{amount}</span>
            <button className="counter__button" aria-label="increment-value" onClick={debounce(handleIncrement, 1000)} disabled={isBlocked}>
                <span className="counter__text">+</span>
            </button>
            <span className="counter__description">{`Obecnie masz ${amount} sztuk produktu`}</span>
        </div>
    )
}
export default ProductCounter;