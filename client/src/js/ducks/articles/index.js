import { take, call, put, all } from 'redux-saga/effects'
import axios from 'axios'
import { push } from 'connected-react-router'

export const moduleName = 'articles'
export const SEARCH_ARTICLE = `SEARCH_ARTICLE`

export const FETCH_ARTICLE = `FETCH_ARTICLE`
export const FETCH_ARTICLE_SUCCESS = `FETCH_ARTICLE_SUCCESS`
export const FETCH_ARTICLE_FAILURE = `FETCH_ARTICLE_FAILURE`

export const FETCH_ARTICLES = `FETCH_ARTICLES`
export const FETCH_ARTICLES_SUCCESS = `FETCH_ARTICLES_SUCCESS`
export const FETCH_ARTICLES_FAILURE = `FETCH_ARTICLES_FAILURE`

export const ADD_ARTICLE_REQUEST = `ADD_ARTICLE_REQUEST`
export const ADD_ARTICLE_SUCCESS = `ADD_ARTICLE_SUCCESS`
export const ADD_ARTICLE_FAILURE = `ADD_ARTICLE_FAILURE`

const INITIAL_STATE = {
  articleList: { posts: [], error: null, loading: false },
  articleId: { post: null, error: null, loading: false },
}
export default function reducer(state = INITIAL_STATE, action) {
  let error
  const { type, payload } = action
  switch (type) {
    case FETCH_ARTICLE:
      return {
        ...state,
        articleId: {
          post: null,
          loading: true,
        },
      }
    case FETCH_ARTICLE_SUCCESS:
      console.log('RED-ART', payload)
      return {
        ...state,
        articleId: {
          post: payload,
          error: null,
          loading: false,
        },
      }
    case FETCH_ARTICLE_FAILURE:
      error = payload || { message: payload.message }
      return {
        ...state,
        articleId: {
          post: null,
          error: error,
          loading: false,
        },
      }
    case FETCH_ARTICLES:
      return {
        ...state,
        articleList: { posts: [], loading: true, error: payload },
      }
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        articleList: {
          posts: payload,
          error: null,
          loading: false,
        },
      }
    case FETCH_ARTICLES_FAILURE:
      error = payload
      return {
        ...state,
        articleList: { post: null, error: error, loading: false },
      }

    default:
      return state
  }
}

export function SearchArticles() {
  return {
    type: SEARCH_ARTICLE,
  }
}

export function fetchArticleId(slug) {
  return {
    type: FETCH_ARTICLE,
    payload: { slug },
  }
}

export const fetchAllArticles = function() {
  return {
    type: FETCH_ARTICLES,
  }
}
export const addArticle = function(data) {
  return {
    type: ADD_ARTICLE_REQUEST,
    payload: data,
  }
}

export const fetchArticles = () =>
  axios
    .get('http://localhost:4001/api/articles', {
      headers: [],
    })
    .then(response => response.data)

export function fetchArticlesSuccess(articles) {
  return {
    type: FETCH_ARTICLES_SUCCESS,
    payload: articles,
  }
}

export function fetchArticlesFailure(error) {
  return {
    type: FETCH_ARTICLES_FAILURE,
    payload: error,
  }
}

export const fetchArticlesReact = () =>
  axios
    .get('http://localhost:4001/api/artreact', {
      headers: [],
    })
    .then(response => response.data)

export const fetchArticlesSaga = function*() {
  while (true) {
    try {
      yield take(FETCH_ARTICLES)
      const resp = yield call(fetchArticles)
      yield put(fetchArticlesSuccess(resp))
    } catch (error) {
      yield put({ type: FETCH_ARTICLES_FAILURE, payload: error })
    }
  }
}

function fetchArticle(slug) {
  return axios.get(`http://localhost:4001/api/article/${slug}`)
}

export function fetchArticleIdSuccess(article) {
  return {
    type: FETCH_ARTICLE_SUCCESS,
    payload: article,
  }
}

export function fetchArticleSuccess(articles) {
  return {
    type: FETCH_ARTICLE_SUCCESS,
    payload: articles,
  }
}
export function fetchArticleFailure(error) {
  return {
    type: FETCH_ARTICLE_FAILURE,
    payload: error,
  }
}

export const fetchArticleIdSaga = function*() {
  while (true) {
    const action = yield take(FETCH_ARTICLE)

    const resp = yield call(fetchArticle, action.payload.slug)
    console.log('SAG-1', resp)
    yield put(fetchArticleIdSuccess(resp.data))
  }
}

export const addArticleSaga = function*() {
  while (true) {
    const action = yield take(ADD_ARTICLE_REQUEST)

    try {
      const response = yield axios.post(
        'http://localhost:4001/api/addarticle',
        action.payload
      )

      yield put({
        type: ADD_ARTICLE_SUCCESS,
        payload: { response },
      })

      yield put(push('/articles'))
    } catch (err) {
      yield put({ type: ADD_ARTICLE_FAILURE, payload: err.response })
    }
  }
}

export function* saga() {
  yield all([fetchArticlesSaga(), fetchArticleIdSaga(), addArticleSaga()])
}
