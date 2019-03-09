
import { takeEvery } from 'redux-saga/effects'
import {
  GET_USER_DETAILS, ADD_CARD_DETAILS, GET_CARD_DETAILS, DELETE_CARD_DETAILS,
  ADD_ADDRESS_DETAILS, EDIT_ADDRESS_DETAILS, DELETE_ADDRESS_DETAILS, GET_ADDRESS_DETAILS

} from '../actions/types'
import { asyncSaga } from '../utils';

export function* authSaga() {
  yield takeEvery(GET_USER_DETAILS.REQ, asyncSaga);
  yield takeEvery(ADD_CARD_DETAILS.REQ, asyncSaga);
  yield takeEvery(GET_CARD_DETAILS.REQ, asyncSaga);
  yield takeEvery(DELETE_CARD_DETAILS.REQ, asyncSaga);
  yield takeEvery(ADD_ADDRESS_DETAILS.REQ, asyncSaga);
  yield takeEvery(EDIT_ADDRESS_DETAILS.REQ, asyncSaga);
  yield takeEvery(DELETE_ADDRESS_DETAILS.REQ, asyncSaga);
  yield takeEvery(GET_ADDRESS_DETAILS.REQ, asyncSaga);
}

export default authSaga;