import * as constants from '../constants';

const initialState = {
  products: [],
  isLoading: false,
  isError: false,
  totalProducts: 0,
}

export function productsReducer(state = initialState, action) {
  switch (action.type) {
    case constants.PRODUCTS_GET_START:
      return { ...state, isLoading: true }
    case constants.PRODUCTS_GET_SUCCESS:
      return { ...state, isLoading: false, products: action.payload.data, totalProducts: action.payload.total }
    case constants.PRODUCTS_GET_ERROR:
      return { ...state, isLoading: false, isError: true }
    default:
      return state;
  }
};