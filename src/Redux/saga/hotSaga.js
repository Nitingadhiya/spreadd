
import { takeEvery } from 'redux-saga/effects'
import {
  GET_PROMOTIONS
} from '../actions/types'
import { asyncSaga } from '../utils';

export function* hotSaga() {
  yield takeEvery(GET_PROMOTIONS.REQ, asyncSaga);
}

export default hotSaga;