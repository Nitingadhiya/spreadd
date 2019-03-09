import {
  GET_CATEGORY, ADD_REVIEW, GET_NEW_SHOP, GET_ALL_SHOP, GET_SHOP_PRODUCTS
} from '../actions/types';
const INITIAL_STATE = {}


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case GET_CATEGORY.SUCCESS:
      return { getCategorySuccess: true, data: action.payload }

    case ADD_REVIEW.SUCCESS:
      return { addReviewSuccess: true, data: action.payload }

    case GET_NEW_SHOP.SUCCESS:
      return { getNewShopSuccess: true, data: action.payload }

    case GET_ALL_SHOP.SUCCESS:
      return { getAllShopSuccess: true, data: action.payload }

    case GET_SHOP_PRODUCTS.SUCCESS:
      return { getShopProductsSuccess: true, data: action.payload }

    case GET_SHOP_PRODUCTS.ERROR:
    case GET_ALL_SHOP.ERROR:
    case GET_NEW_SHOP.ERROR:
    case ADD_REVIEW.ERROR:
    case GET_CATEGORY.ERROR:
      return { isRequestFailed: true, data: action.payload }

    default:
      return state;
  }
}
