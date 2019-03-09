
import { takeEvery } from 'redux-saga/effects'
import {
  GET_CATEGORY, ADD_REVIEW, GET_NEW_SHOP, GET_ALL_SHOP, GET_SHOP_PRODUCTS
} from '../actions/types'
import { asyncSaga } from '../utils';

export function* homeSaga() {
  yield takeEvery(GET_CATEGORY.REQ, asyncSaga);
  yield takeEvery(ADD_REVIEW.REQ, asyncSaga);
  yield takeEvery(GET_NEW_SHOP.REQ, asyncSaga);
  yield takeEvery(GET_ALL_SHOP.REQ, asyncSaga);
  yield takeEvery(GET_SHOP_PRODUCTS.REQ, asyncSaga);

}

export default homeSaga;