import {
  GET_PRODUCTS,
  GET_PRODUCTS_FAILED,
  GET_PRODUCTS_SUCCESS,
  CHANGE_PRODUCT_AMOUNT,
} from "../actions/products";

const initialState = {
  products: {
    loading: true,
    list: [],
    error: null,
  },
  summary: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS: {
      return {
        ...state,
        products: { ...state.products, loading: true },
      };
    }
    case GET_PRODUCTS_SUCCESS: {
      const { products } = action.payload;
      const summary = products.map((product) => {
        return {
          pid: product.pid,
          quantity: 1,
          price: product.price,
        };
      });
      return {
        ...state,
        products: {
          ...state.products,
          loading: false,
          error: null,
          list: products,
        },
        summary: [...state.summary, ...summary],
      };
    }
    case GET_PRODUCTS_FAILED: {
      const { error } = action.payload;
      return {
        ...state,
        products: { ...state.products, loading: false, error },
      };
    }
    case CHANGE_PRODUCT_AMOUNT: {
      const pid = action.payload.pid;
      const min = action.payload.min;
      const max = action.payload.max;
      const quantity = action.payload.quantity;
      const summary = state.summary.map((product) => {
        if (product.pid === pid) {
          if (quantity <= max && quantity >= min) {
            return { ...product, quantity: quantity };
          }
        }
        return product;
      });
      return { ...state, summary };
    }
    default:
      return state;
  }
}
