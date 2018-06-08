import * as constants from '../constants';
import fetch from 'isomorphic-fetch';

export function getProductsStart() {
  return {
    type: constants.PRODUCTS_GET_START,
  };
};

export function getProductsSucccess(data) {
  return {
    type: constants.PRODUCTS_GET_SUCCESS,
    payload: {
      data: data.data,
      total: data.total
    }
  };
};

export function getProductsError(error) {
  return {
    type: constants.PRODUCTS_GET_ERROR,
    payload: {
      error
    }
  };
};

export function getProducts(page = 0, phrase = '', categoryId = '') {
  return (dispatch) => {
    dispatch(getProductsStart());
    fetch(`http://localhost:4000/search?page=${page}&phrase=${phrase}&filter[category]=${categoryId}`)
      .then(response => response.json())
      .then(data => {
        dispatch(getProductsSucccess(data));
      })
      .catch(error => dispatch(getProductsError(error)))
  };
};
