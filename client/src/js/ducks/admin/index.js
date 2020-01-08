export const moduleName = 'admin'

export const ADD_LESSON_REQUEST = `ADD_LESSON_REQUEST`
export const ADD_LESSON_SUCCESS = `ADD_LESSON_SUCCESS`
export const ADD_LESSON_FAILURE = `ADD_LESSON_FAILURE`
/*
export const DELETE_LESSON_REQUEST = `DELETE_LESSON_REQUEST`
export const DELETE_LESSON_SUCCESS = `DELETE_LESSON_SUCCESS`
export const DELETE_LESSON_FAILURE = `DELETE_LESSON_FAILURE`


export const UPDATE_LESSON_REQUEST = `UPDATE_LESSON_REQUEST`
export const UPDATE_ARTICLE_SUCCESS = `UPDATE_ARTICLE_SUCCES`
export const UPDATE_ARTICLE_FAILURE = `UPDATE_ARTICLE_FAILURE`
*/

const initialState = {
  posts: [],
  post: {},
  loading: false,
  error: null,
}

export default function reducer(state = initialState, action) {
  let error
  const { type, payload } = action
  switch (type) {
    case ADD_LESSON_REQUEST:
      return {
        ...state,

        loading: true,
      }
    case ADD_LESSON_SUCCESS:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      }
    case ADD_LESSON_FAILURE:
      error = payload || { message: payload.message }
      return {
        ...state,
        error: error,
      }

    default:
      return state
  }
}

export const addLesson = function(data) {
  return {
    type: ADD_LESSON_REQUEST,
    payload: data,
  }
}
