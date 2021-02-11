import { GET_PRODUCTS, GET_PRODUCTS_FAILED, GET_PRODUCTS_SUCCESS } from "./actions";

const initialState = {
    products: {
        loading: true,
        list: [
        ],
        error: null
    },
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS: {
            return {
                ...state,
                products: {...state.products, loading: true},
            };
        }
        case GET_PRODUCTS_SUCCESS: {
            const { products } = action.payload;
            return {
                ...state,
                products: {...state.products, loading: false, error: null, list: products}
            };
        }
        case GET_PRODUCTS_FAILED:{
            const { error } = action.payload;
            return {
                ...state,
                products: {...state.products, loading: false, error,}
            };
        }
        default:
            return state;
    }
}
