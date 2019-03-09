import { fork, all } from 'redux-saga/effects';

import authSaga from './authSaga'
import profileSaga from './profileSaga'
import homeSaga from './homeSaga'
import hotSaga from './hotSaga'

// export default function* rootSaga() {
//   console.log('called..****')
//   //yield authSaga(),
//   yield profileSaga()
// };

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(profileSaga),
    fork(homeSaga),
    fork(hotSaga)
  ]);
};