import React from "react";
import "../../sass/ProductsList.scss";
import ProductCounter from "./ProductCounter";

const ProductsList = () =>{
    return(
        <div className="products">
            <h3 className="products__title">Lista produktów</h3>
            <ul className="products__list">
                <li className="products__row">
                    <ProductItem/>
                    <ProductCounter/>
                </li>
            </ul>
        </div>
    )
}
export default ProductsList;


const ProductItem = () =>{
    return(
        <>
            Patelnia, cena: 89,99zł
        </>
    )
}
