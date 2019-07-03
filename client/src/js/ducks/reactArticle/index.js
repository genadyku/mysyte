import { take, call, put, all } from 'redux-saga/effects'
import axios from 'axios'

export const moduleNameR = 'reactarticles'

export const FETCH_ARTICLER = `FETCH_ARTICLER`
export const FETCH_ARTICLER_SUCCESS = `FETCH_ARTICLER_SUCCESS`
export const FETCH_ARTICLER_FAILURE = `FETCH_ARTICLER_FAILURE`

export const FETCH_ARTICLESR = `FETCH_ARTICLESR`
export const FETCH_ARTICLESR_SUCCESS = `FETCH_ARTICLESR_SUCCESS`
export const FETCH_ARTICLESR_FAILURE = `FETCH_ARTICLESR_FAILURE`

const INITIAL_STATE = {
  articleList: { posts: [], error: null, loading: false },
  articleId: { post: null, error: null, loading: false },
}
export default function reducer(state = INITIAL_STATE, action) {
  let error
  const { type, payload } = action
  switch (type) {
    case FETCH_ARTICLER:
      return {
        ...state,
        articleId: {
          post: null,
          loading: true,
        },
      }
    case FETCH_ARTICLER_SUCCESS:
      return {
        ...state,
        articleId: {
          post: payload,
          error: null,
          loading: false,
        },
      }
    case FETCH_ARTICLER_FAILURE:
      error = payload || { message: payload.message }
      return {
        ...state,
        articleId: {
          post: null,
          error: error,
          loading: false,
        },
      }
    case FETCH_ARTICLESR:
      return {
        ...state,
        articleList: { posts: [], loading: true, error: payload },
      }
    case FETCH_ARTICLESR_SUCCESS:
      return {
        ...state,
        articleList: {
          posts: payload,
          error: null,
          loading: false,
        },
      }
    case FETCH_ARTICLESR_FAILURE:
      error = payload
      return {
        ...state,
        articleList: { post: null, error: error, loading: false },
      }

    default:
      return state
  }
}

export const fetchAllArticlesReact = function() {
  return {
    type: FETCH_ARTICLESR,
  }
}

export function fetchArticleReactId(id) {
  return {
    type: FETCH_ARTICLER,
    payload: { id },
  }
}

export const fetchArticlesReact = () =>
  axios
    .get('http://localhost:4001/api/artreact', {
      headers: [],
    })
    .then(response => response.data)

export function fetchArticlesReactSuccess(articles) {
  return {
    type: FETCH_ARTICLESR_SUCCESS,
    payload: articles,
  }
}

export function fetchArticlesReactFailure(error) {
  return {
    type: FETCH_ARTICLESR_FAILURE,
    payload: error,
  }
}

function fetchReactArticle(id) {
  return axios.get(`http://localhost:4001/api/artreact/${id}`)
}

export function fetchArticleIdReactSuccess(article) {
  return {
    type: FETCH_ARTICLER_SUCCESS,
    payload: article,
  }
}

export function fetchArticleReactSuccess(articles) {
  return {
    type: FETCH_ARTICLER_SUCCESS,
    payload: articles,
  }
}
export function fetchArticleReactFailure(error) {
  return {
    type: FETCH_ARTICLER_FAILURE,
    payload: error,
  }
}
export const fetchArticlesReactSaga = function*() {
  while (true) {
    try {
      yield take(FETCH_ARTICLESR)
      const resp = yield call(fetchArticlesReact)
      yield put(fetchArticlesReactSuccess(resp))
    } catch (error) {
      yield put({ type: FETCH_ARTICLESR_FAILURE, payload: error })
    }
  }
}
export const fetchArticleIdReactSaga = function*() {
  while (true) {
    const action = yield take(FETCH_ARTICLER)

    const resp = yield call(fetchReactArticle, action.payload.id)

    yield put(fetchArticleIdReactSuccess(resp.data))
  }
}

export function* saga() {
  yield all([fetchArticlesReactSaga(), fetchArticleIdReactSaga()])
}
