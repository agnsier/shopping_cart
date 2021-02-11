import React from "react";

const ProductCounter = () =>{
    return(
        <div>
            <button aria-label="decrement-value">
                -
            </button>
            <span>1</span>
            <button aria-label="increment-value">
                +
            </button>
        </div>
    )
}
export default ProductCounter;