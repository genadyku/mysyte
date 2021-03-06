import { all } from 'redux-saga/effects'
import { saga as articlesSaga } from '../ducks/articles'
import { saga as articlesReactSaga } from '../ducks/reactArticle'
import { saga as lessonSaga } from '../ducks/lesson'

import { saga as autSaga } from '../ducks/auth'

import { saga as initialSaga } from '../ducks/initial'

export default function* rootSaga() {
  yield all([
    articlesSaga(),
    autSaga(),
    initialSaga(),
    articlesReactSaga(),
    lessonSaga(),
  ])
}
