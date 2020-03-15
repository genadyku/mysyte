import { take, put, all, fork } from 'redux-saga/effects'
import axios from 'axios'

import { push } from 'connected-react-router'

import { setAuth } from '../initial'

export const moduleName = 'login'

const SIGN_IN_USER = 'SIGN_IN_USER'
const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
const SIGN_IN_ERROR = 'SIGN_IN_ERROR'

const SIGN_UP_USER = 'SIGNUP_USER'
const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
const SIGN_UP_ERROR = 'SIGN_UP_ERROR'

const FORGOT = 'FORGOT'
const FORGOT_SUCCESS = 'FORGOTP_SUCCESS'
const FORGOT_ERROR = 'FORGOT_ERROR'

const SET_PASSWORD = 'SET_PASSWORD'
const SET_PASSWORD_SUCCESS = 'SET_PASSWORD_SUCCESS'
const SET_PASSWORD_ERROR = 'SET_PASSWORD_ERROR'

export const AUTH_CONFIRM_ACCOUNT_REQUEST = 'AUTHENTICATE_CONFIRM_ACCOUNT_TOKEN'
export const AUTH_CONFIRM_ACCOUNT_SUCCESS =
  'AUTHENTICATE_CONFIRM_ACCOUNT_TOKEN_SUCCESS'
export const AUTH_CONFIRM_ACCOUNT_ERROR =
  'AUTHENTICATE_CONFIRM_ACCOUNT_TOKEN_ERROR'
export const AUTH_REFRECH_ACCOUNT_REQUEST = 'AUTHENTICATE_REFRECH_ACCOUNT_TOKEN'
export const AUTH_REFRECH_ACCOUNT_SUCCESS =
  'AUTHENTICATE_REFRECH_ACCOUNT_TOKEN_SUCCESS'
export const AUTH_REFRECH_ACCOUNT_ERROR =
  'AUTHENTICATE_REFRECH_ACCOUNT_TOKEN_ERROR'

export const RESET_TOKEN = 'RESET_TOKEN'
export const RESET_TOKEN_SUCCESS = 'RESET_TOKEN_SUCCESS'
export const RESET_TOKEN_ERROR = 'RESET_TOKEN_ERROR'

const INITIAL_STATE = {
  user: null,
  status: null,
  admin: '0',
  isConfirm: false,
  token: null,
  refreshToken: null,
  error: null,
  errorResore: null,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN_USER:
      return {
        ...state,
        user: null,
        status: 'signin',
        admin: '0',
        isConfirm: false,
        loading: false,
        error: null,
      }
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        user: action.payload.response,
        status: 'authenticated',
        admin: action.payload.response.data.admin,
        isConfirm: true,
        token: action.payload.response.data.token,
        refreshToken: action.payload.response.data.refreshToken,
        error: null,
      }
    case SIGN_IN_ERROR:
      return {
        ...state,
        user: null,
        status: 'notauthenticated',
        admin: '0',
        isConfirm: false,
        token: null,
        refreshToken: null,
        error: { message: action.payload.data.message },
      }

    case SIGN_UP_USER:
      return {
        ...state,
        user: null,
        status: 'signup',
        error: null,
      }
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        status: 'authenticated',
        isConfirm: false,
        token: action.payload.response.data.token,
        refreshToken: action.payload.response.data.refreshToken,
        error: null,
      }
    case SIGN_UP_ERROR:
      return {
        ...state,
        user: null,
        status: 'notauthenticated',
        isConfirm: false,
        token: null,
        refreshToken: null,
        error: { message: action.payload.data.message },
      }
    case AUTH_CONFIRM_ACCOUNT_REQUEST:
      return {
        ...state,
        token: action.payload.token,
        status: 'authenticated',
        isConfirm: false,
        error: null,
      }

    case AUTH_CONFIRM_ACCOUNT_SUCCESS:
      console.log('CASUS', action.payload.response.data.token)
      return {
        ...state,
        status: 'authenticated',
        isConfirm: true,
        token: action.payload.response.data.token,
        refreshToken: action.payload.response.data.refreshToken,
        error: null,
      }

    case AUTH_CONFIRM_ACCOUNT_ERROR:
      return {
        ...state,
        status: 'authenticated',
        isConfirm: false,
        token: null,
        refreshToken: null,
        error: { message: action.payload.data.message },
      }
    case RESET_TOKEN:
      return {
        ...state,
        errorResore: null,
      }
    case RESET_TOKEN_SUCCESS:
      return {
        ...state,
        user: action.payload.response.data.user,
      }
    case RESET_TOKEN_ERROR:
      return {
        ...state,
        user: action.payload.response,
        susses: false,
        errorRestore: { message: action.payload.data.message },
      }
    case SET_PASSWORD:
      return {
        ...state,
        errorRestore: null,
      }
    case SET_PASSWORD_SUCCESS:
      return {
        ...state,
        user: action.payload.response.data.user,
      }
    case SET_PASSWORD_ERROR:
      return {
        ...state,
        susses: false,
        errorRestore: { message: action.payload.data.error.message },
      }

    default:
      return state
  }
}

export const submitin = function(data) {
  return {
    type: SIGN_IN_USER,
    payload: data,
  }
}

export const signup = function(data) {
  return {
    type: SIGN_UP_USER,
    payload: data,
  }
}

export const forgot = function(data) {
  return {
    type: FORGOT,
    payload: data,
  }
}

export const setpassw = function(data) {
  return {
    type: SET_PASSWORD,
    payload: data,
  }
}

export const signInSaga = function*() {
  while (true) {
    const action = yield take(SIGN_IN_USER)

    try {
      const response = yield axios.post(
        'http://localhost:4001/api/signin',
        action.payload
      )

      yield put({
        type: SIGN_IN_SUCCESS,
        payload: { response },
      })
      console.log('SAGA-SIGNIN', response)
      console.log('SAGA-SIGNIN-admin', response.data.admin)
      yield put(setAuth(response.data.token, response.data.refreshToken))
      yield put(push('/'))
    } catch (err) {
      yield put({ type: SIGN_IN_ERROR, payload: err.response })
    }
  }
}
export const signupSaga = function*() {
  while (true) {
    const action = yield take(SIGN_UP_USER)

    try {
      const response = yield axios.post(
        'http://localhost:4001/api/signup',
        action.payload
      )
      const token = response.data.token

      yield put({
        type: SIGN_UP_SUCCESS,
        payload: { response },
      })

      yield put(setAuth(token))

      try {
        localStorage.setItem('token', JSON.stringify(token))
      } catch (e) {
        console.warn('Problem with localStorage.setItem:', e)
      }
      yield put(push('/account/status'))
    } catch (err) {
      yield put({ type: SIGN_UP_ERROR, payload: err.response })
    }
  }
}

export const forgotSaga = function*() {
  while (true) {
    const action = yield take(FORGOT)

    try {
      const response = yield axios.post(
        'http://localhost:4001/api/forgot',
        action.payload
      )

      yield put({
        type: FORGOT_SUCCESS,
        payload: { response },
      })
    } catch (err) {
      yield put({ type: FORGOT_ERROR, payload: err.response })
    }
  }
}

export const setpasswSaga = function*() {
  while (true) {
    const action = yield take(SET_PASSWORD)

    try {
      const response = yield axios.post(
        'http://localhost:4001/api/setpassword',
        action.payload
      )
      console.log('setpassw', response)
      yield put({
        type: SET_PASSWORD_SUCCESS,
        payload: { response },
      })

      yield put(push('/signin'))
    } catch (err) {
      yield put({ type: SET_PASSWORD_ERROR, payload: err.response })
    }
  }
}
//////////

export const authConfirmAccountToken = token => ({
  type: AUTH_CONFIRM_ACCOUNT_REQUEST,
  payload: {
    token,
  },
})

export const authConfirmAccountTokenSuccess = payload => ({
  type: AUTH_CONFIRM_ACCOUNT_SUCCESS,
  payload,
})

export const authConfirmAccountTokenError = payload => ({
  type: AUTH_CONFIRM_ACCOUNT_ERROR,
  payload,
})

export const authRefrechAccountToken = token => ({
  type: AUTH_REFRECH_ACCOUNT_REQUEST,
  payload: {
    token,
  },
})

export const authRefrechAccountTokenSuccess = payload => ({
  type: AUTH_REFRECH_ACCOUNT_SUCCESS,
  payload,
})

export const authRefrechAccountTokenError = payload => ({
  type: AUTH_REFRECH_ACCOUNT_ERROR,
  payload,
})

export const resetToken = token => ({
  type: RESET_TOKEN,
  payload: {
    token,
  },
})

export const resetTokenSuccess = payload => ({
  type: RESET_TOKEN_SUCCESS,
  payload,
})

export const resetTokenError = payload => ({
  type: RESET_TOKEN_ERROR,
  payload,
})

export const authConfirmAcountSaga = function*() {
  while (true) {
    const action = yield take(AUTH_CONFIRM_ACCOUNT_REQUEST)

    const token = action.payload.token
    console.log('1', token)
    try {
      const response = yield axios.post(
        'http://localhost:4001/api/verifymail/${token}',
        action.payload
      )

      yield put({
        type: AUTH_CONFIRM_ACCOUNT_SUCCESS,
        payload: { response },
      })
      yield put(setAuth(response.data.token, response.data.refreshToken))
      yield put(push('/'))
    } catch (err) {
      yield put({ type: AUTH_CONFIRM_ACCOUNT_ERROR, payload: err.response })
    }
  }
}
export function resendValidationEmail(tokenFromStorage) {
  const request = axios({
    method: 'get',
    url: `http://localhost:4001/api/resendmail`,
    headers: { Authorization: `Bearer ${tokenFromStorage}` },
  })

  return request
}

export const authRefrechAcountSaga = function*() {
  while (true) {
    const action = yield take(AUTH_REFRECH_ACCOUNT_REQUEST)

    try {
      const response = yield axios.post(
        'http://localhost:4001/api/resendmail/${token}',
        action.payload
      )

      yield put({
        type: AUTH_REFRECH_ACCOUNT_SUCCESS,
        payload: { response },
      })
    } catch (err) {
      yield put({ type: AUTH_REFRECH_ACCOUNT_ERROR, payload: err.response })
    }
  }
}

export const resetTokenSaga = function*() {
  while (true) {
    const action = yield take(RESET_TOKEN)

    try {
      const response = yield axios.post(
        'http://localhost:4001/api/verify/${token}',
        action.payload
      )

      yield put({
        type: RESET_TOKEN_SUCCESS,
        payload: { response },
      })
    } catch (err) {
      yield put({ type: RESET_TOKEN_ERROR, payload: err.response })
    }
  }
}
export function* saga() {
  yield all([
    fork(signInSaga),
    fork(signupSaga),
    fork(authConfirmAcountSaga),
    fork(authRefrechAcountSaga),
    fork(forgotSaga),
    fork(setpasswSaga),
    fork(resetTokenSaga),
  ])
}
