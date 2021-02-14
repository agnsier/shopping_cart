export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const GET_PRODUCTS_FAILED = "GET_PRODUCTS_FAILED";
export const CHANGE_PRODUCT_AMOUNT = "CHANGE_PRODUCT_AMOUNT";
export const DECREMENT_PRODUCT_AMOUNT = "DECREMENT_PRODUCT_AMOUNT";

export const getProducts = () => {
    return {
        type: GET_PRODUCTS
    };
};

export const  getProductsSuccess = (products) => {
    return {
        type: GET_PRODUCTS_SUCCESS,
        payload: {
            products
        }
    };
};

export const  getProductsFailed = (error) => {
    return {
        type: GET_PRODUCTS_FAILED,
        error: error
    };
};

export const changeProductAmount = (pid, min, max, quantity) => {
    return {
        type: CHANGE_PRODUCT_AMOUNT,
        payload:{
            pid,
            min,
            max,
            quantity
        }
    };
};

export const  decrementProductAmount = ({pid, min, max, quantity}) => {
    return {
        type: DECREMENT_PRODUCT_AMOUNT,
        payload:{
            pid,
            min,
            max,
            quantity
        }
    };
};


export const getProductsRequest = () => {
    return (dispatch) => {
        dispatch(getProducts())
        fetch("/api/cart").then((response) => {
            if(response.status === 200){
                return response.json()
            }else {
                dispatch(getProductsFailed('Some error happened'))
            }
        }).then((data) => {
            dispatch(getProductsSuccess(data))
        }).catch(()=> dispatch(getProductsFailed('Some error happened')))
    }
}
export const checkRequest = (pid, min, max, quantity) => {
    //TODO error handling
    return (dispatch) => {
        fetch("/api/product/check",{
            method: "POST",
            body: JSON.stringify({
                pid,
                quantity
            })
        }).then((response) => {
            if(response.status === 200){
                dispatch(changeProductAmount(pid, min, max, quantity))
            }else {
                dispatch(changeProductAmount(pid, min, max, min))
            }
        }).catch((e)=> console.log(e))
    }
}