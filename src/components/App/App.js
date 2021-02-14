import React, {useEffect} from 'react';
import '../../sass/App.scss';
import {useDispatch, useSelector} from "react-redux";
import {getProductsRequest} from "../../redux/actions/products"
import ProductCounter from "../Products/ProductCounter";
const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProductsRequest())
    }, [])
    const products = useSelector(state => state.shoppingCart.products)
    const summary = useSelector(state => state.shoppingCart.summary)
    if(products.loading){
        return <div className="centered-container"><span>Loading...</span></div>
    }
    if(products.error){
        return <div className="centered-container"><span>{products.error}</span></div>
    }
    const calculateSummary = () =>{
        if(summary && summary.length > 0 ){
            let initialValue = 0
            const sum  = summary.reduce((acc, curr) => {
                return acc + (parseFloat(curr.price) * curr.amount)
            }, initialValue)
            return <div className="products__summary">
                <span>Podsumowanie</span>
                <span>{`${sum.toFixed(2)} zł`}</span></div>
        }
    }
    return (
        <div className="container">
            <div className="products">
                <h3 className="products__title">Lista produktów</h3>
                <ul className="products-list">
                    {products && products.list && products.list.length > 0 ? (
                        products.list.map((product) => (
                            <li className="products-list__row" key={product.pid}>
                                <span className="products-list__name">{product.name}</span>
                                <ProductCounter pid={product.pid} min={product.min} max={product.max} isBlocked={product.isBlocked}/>
                                <span className="products-list__price">{`${product.price} zł`}</span>
                            </li>
                        ))
                    ):(
                        <div className="centered-container">Twój koszyk jest pusty</div>
                    )
                    }
                </ul>
                {calculateSummary()}
            </div>
        </div>
    );
};


export default App;
