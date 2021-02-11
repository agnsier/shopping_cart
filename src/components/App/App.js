import React, {useEffect} from 'react';
import '../../sass/App.scss';
import {useDispatch, useSelector} from "react-redux";
import {getProductsRequest} from "../../redux/actions"
import ProductCounter from "../Products/ProductCounter";
const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProductsRequest())
    }, [])
    const products = useSelector(state => state.products)
    if(products.loading){
        return "Loading..."
    }
    return (
        <div className="container">
            <div className="products">
                <h3 className="products__title">Lista produktów</h3>
                <ul className="products__list">
                    {products && products.list && products.list.length > 0 ? (
                        products.list.map((product) => (
                            <li className="products__row" key={product.pid}>
                                <span>{product.name}</span>
                                <span>{`${product.price} zł`}</span>
                                <ProductCounter/>
                            </li>
                        ))
                    ):(
                        <div>Placeholder</div>
                    )
                    }
                </ul>
            </div>
        </div>
    );
};

export {
    App
};
