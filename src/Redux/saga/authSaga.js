
import { put, call, takeEvery } from 'redux-saga/effects'
import {
  SIGNUP,
  LOGIN,
  FORGET_PASSWORD,
  CHANGE_PASSWORD
} from '../actions/types'
import Api from '../../Api/api'
import { asyncSaga } from '../utils';


// export function* signupAsync({ params }) {
//   console.log(params)
//   try {

//     const response = yield call(Api.signup, params)
//     console.log(response)
//     yield put({ type: SIGNUP.SUCCESS, payload: response })
//   }
//   catch (e) {
//     response.log(e)
//     yield put({ type: SIGNUP.ERROR, payload: e })
//   }
// }

export function* authSaga() {
  yield takeEvery(SIGNUP.REQ, asyncSaga);
  yield takeEvery(LOGIN.REQ, asyncSaga);
  yield takeEvery(FORGET_PASSWORD.REQ, asyncSaga);
  yield takeEvery(CHANGE_PASSWORD.REQ, asyncSaga);
}

export default authSaga;