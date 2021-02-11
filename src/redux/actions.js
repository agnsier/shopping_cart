export const GET_PRODUCTS = "'GET_PRODUCTS'";
export const GET_PRODUCTS_SUCCESS = "'GET_PRODUCTS_SUCCESS'";
export const GET_PRODUCTS_FAILED = 'GET_PRODUCTS_FAILED';

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

export const getProductsRequest = () => {
    return (dispatch, getState) => {
        dispatch(getProducts())
        fetch("/api/cart").then((response) => {
            if(response.status === 200){
                return response.json()
            }else {
                dispatch(getProductsFailed('ERROR'))
            }
        }).then((data) => {
            dispatch(getProductsSuccess(data))
        }).catch((e)=> console.log(e))
    }
}