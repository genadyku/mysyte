import { take, call, put, all } from 'redux-saga/effects'
import axios from 'axios'
import { push } from 'connected-react-router'

export const moduleNameL = 'lesson'

export const CHAPTERS_REQUEST = `CHAPTERS_REQUEST`
export const CHAPTERS_SUCCESS = `CHAPTERS_SUCCESS`
export const CHAPTERS_FAILURE = `CHAPTERS_FAILURE`

export const ADD_CHAPTERS_REQUEST = `ADD_CHAPTERS_REQUEST`
export const ADD_CHAPTERS_SUCCESS = `ADD_CHAPTERS_SUCCESS`
export const ADD_CHAPTERS_FAILURE = `ADD_CHAPTERS_FAILURE`

export const LESSONS_REQUEST = `LESSONS_REQUEST`
export const LESSONS_SUCCESS = `LESSONS_SUCCESS`
export const LESSONS_FAILURE = `LESSONS_FAILURE`

export const LESSON_REQUEST = `LESSON_REQUEST`
export const LESSON_SUCCESS = `LESSON_SUCCESS`
export const LESSON_FAILURE = `LESSON_FAILURE`

export const ADD_LESSON_REQUEST = `ADD_LESSON_REQUEST`
export const ADD_LESSON_SUCCESS = `ADD_LESSON_SUCCESS`
export const ADD_LESSON_FAILURE = `ADD_LESSON_FAILURE`

const initialState = {
  lessons: {
    chapters: [],
    loading: false,
    error: null,
  },
  lesson: {
    lesson: null,
    loading: false,
    error: null,
  },
}

export default function reducer(state = initialState, action) {
  let error
  const { type, payload } = action
  switch (type) {
    case CHAPTERS_REQUEST:
      return {
        ...state,
        lessons: {
          chapters: [],
          loading: true,
          error: null,
        },
      }
    case CHAPTERS_SUCCESS:
      return {
        ...state,
        lessons: {
          chapters: action.payload,
          loading: false,
          error: null,
        },
      }
    case CHAPTERS_FAILURE:
      return {
        ...state,
        error: { message: action.payload.data.message },
      }

    case LESSONS_REQUEST:
      return {
        ...state,
        lessons: {
          chapters: [],
          loading: true,
          error: null,
        },
      }
    case LESSONS_SUCCESS:
      console.log('RED1', action.payload)
      action.payload
      return {
        ...state,
        lessons: {
          chapters: action.payload,
          loading: false,
          error: null,
        },
      }
    case LESSONS_FAILURE:
      return {
        ...state,
        error: { message: action.payload.data.message },
      }

    case LESSON_REQUEST:
      return {
        ...state,
        lesson: {
          lesson: null,
          error: null,
          loading: true,
        },
      }
    case LESSON_SUCCESS:
      console.log('RED2', action.payload)

      return {
        ...state,
        lesson: {
          lesson: payload.data,
          error: null,
          loading: false,
        },
      }
    case LESSON_FAILURE:
      error = payload || { message: payload.message }
      return {
        ...state,
        lesson: {
          lessont: null,
          error: error,
          loading: false,
        },
      }
    case ADD_CHAPTERS_REQUEST:
      return {
        ...state,
        lessons: {
          chapters: [],
          loading: true,
          error: null,
        },
      }
    case ADD_CHAPTERS_SUCCESS:
      return {
        ...state,
        lessons: {
          chapters: action.payload,
          loading: true,
          error: null,
        },
      }
    case ADD_CHAPTERS_FAILURE:
      return {
        ...state,
        error: { message: action.payload.data.message },
      }

    case ADD_LESSON_REQUEST:
      return {
        ...state,

        loading: true,
      }
    case ADD_LESSON_SUCCESS:
      return {
        ...state,
        //lesson: [action.payload, ...state.posts],

        lesson: { lesson: action.payload, loading: false, error: null },
      }
    case ADD_LESSON_FAILURE:
      /*
     error = payload || { message: payload.message }

      error: { message: action.payload.data.message },
      return {
        ...state,
        error: error,
      }
      */
      return {
        ...state,
        error: { message: action.payload.data.message },
      }

    default:
      return state
  }
}

export const fetchAllChapters = function() {
  return {
    type: CHAPTERS_REQUEST,
  }
}
export const fetchAllLessons = function() {
  return {
    type: LESSONS_REQUEST,
  }
}
export const addChapter = function(data) {
  return {
    type: ADD_CHAPTERS_REQUEST,
    payload: data,
  }
}
export const addLesson = function(data) {
  return {
    type: ADD_LESSON_REQUEST,
    payload: data,
  }
}

export function fetchLessonSlug(slug) {
  return {
    type: LESSON_REQUEST,
    payload: { slug },
  }
}

function fetchLesson(slug) {
  console.log('00', slug)
  return axios.get(`http://localhost:4001/api/lesson/${slug}`)
}

export function fetchLessonSuccess(article) {
  return {
    type: LESSON_SUCCESS,
    payload: article,
  }
}

export function fetchLessonFailure(error) {
  return {
    type: LESSON_FAILURE,
    payload: error,
  }
}

export const fetchLessonSlugSaga = function*() {
  while (true) {
    try {
      const action = yield take(LESSON_REQUEST)
      console.log('SAGA1=>:', action.payload.slug)
      const resp = yield call(fetchLesson, action.payload.slug)
      console.log('resp3:', resp)

      yield put(fetchLessonSuccess(resp))
    } catch (error) {
      yield put({ type: LESSON_FAILURE, payload: error })
    }
  }
}

export const addChapterSaga = function*() {
  while (true) {
    const action = yield take(ADD_CHAPTERS_REQUEST)

    try {
      const response = yield axios.post(
        'http://localhost:4001/api/addchapter',
        action.payload
      )

      yield put({
        type: ADD_CHAPTERS_SUCCESS,
        payload: { response },
      })

      yield put(push('/lessons'))
    } catch (err) {
      yield put({ type: ADD_CHAPTERS_FAILURE, payload: err.response })
    }
  }
}

export const addLessonSaga = function*() {
  while (true) {
    const action = yield take(ADD_LESSON_REQUEST)
    console.log('reduc add1')
    try {
      const response = yield axios.post(
        'http://localhost:4001/api/addlesson',
        action.payload
      )
      console.log('reduc add2')
      yield put({
        type: ADD_LESSON_SUCCESS,
        payload: { response },
      })
      console.log('reduc add3', response)
      yield put(push('/lessons'))
    } catch (err) {
      yield put({ type: ADD_LESSON_FAILURE, payload: err.response })
    }
  }
}
export const fetchChapters = () =>
  axios
    .get('http://localhost:4001/api/chapter', {
      headers: [],
    })
    .then(response => response.data)

export const fetchLessons = () =>
  axios
    .get('http://localhost:4001/api/lessons', {
      headers: [],
    })
    .then(response => response.data)

export function fetchLessonsSuccess(chapters) {
  return {
    type: LESSONS_SUCCESS,
    payload: chapters,
  }
}

export function fetchLessonsFailure(error) {
  return {
    type: LESSONS_FAILURE,
    payload: error,
  }
}
export const fetchLessonsSaga = function*() {
  while (true) {
    try {
      yield take(LESSONS_REQUEST)
      const resp = yield call(fetchLessons)
      console.log('resp3:', resp)

      yield put(fetchLessonsSuccess(resp))
    } catch (error) {
      yield put({ type: LESSONS_FAILURE, payload: error })
    }
  }
}

export function fetchChaptersSuccess(chapters) {
  return {
    type: CHAPTERS_SUCCESS,
    payload: chapters,
  }
}

export function fetchChaptersFailure(error) {
  return {
    type: CHAPTERS_FAILURE,
    payload: error,
  }
}

export const fetchChaptersSaga = function*() {
  while (true) {
    try {
      yield take(CHAPTERS_REQUEST)
      const resp = yield call(fetchChapters)
      console.log('resp:', resp)

      yield put(fetchChaptersSuccess(resp))
    } catch (error) {
      yield put({ type: CHAPTERS_FAILURE, payload: error })
    }
  }
}
export function* saga() {
  yield all([
    fetchChaptersSaga(),
    addChapterSaga(),
    addLessonSaga(),
    fetchLessonsSaga(),

    fetchLessonSlugSaga(),
  ])
}
