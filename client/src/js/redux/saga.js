import { all } from 'redux-saga/effects'
import { saga as articlesSaga } from '../ducks/articles'
import { saga as autSaga } from '../ducks/auth'

import { saga as initialSaga } from '../ducks/initial'

export default function* rootSaga() {
  yield all([articlesSaga(), autSaga(), initialSaga()])
}
