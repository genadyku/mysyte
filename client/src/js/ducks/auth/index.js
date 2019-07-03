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

const INITIAL_STATE = {
  user: null,
  status: null,
  isConfirm: false,
  token: null,
  refreshToken: null,
  error: null,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN_USER:
      return {
        ...state,
        user: null,
        status: 'signin',
        isConfirm: false,
        loading: false,
        error: null,
      }
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        user: action.payload.response,
        status: 'authenticated',
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
/*
export const setAuth = (token, refreshToken) => {
  localStorage.setItem('token', token)
  localStorage.setItem('refreshToken', refreshToken)

  return {
    type: AUTH_SET,
    token,
    refreshToken,
  }
}

export const unsetAuth = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
  return {
    type: AUTH_UNSET,
  }
}
*/
/*
export const refreshToken = refreshToken => {
  return {
    type: REFRESH_TOKEN,
    refreshToken,
  }
}
*/
export const signInSaga = function*() {
  while (true) {
    const action = yield take(SIGN_IN_USER)

    try {
      const response = yield axios.post(
        'http://localhost:4001/api/signin',
        action.payload
      )
      console.log('SINGIN', response)
      yield put({
        type: SIGN_IN_SUCCESS,
        payload: { response },
      })
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

export const authConfirmAcountSaga = function*() {
  while (true) {
    const action = yield take(AUTH_CONFIRM_ACCOUNT_REQUEST)
    console.log('AUTH_CONFIRM_ACCOUNT_REQUEST 1')
    const token = action.payload.token
    console.log('AUTH_CONFIRM_ACCOUNT_REQUEST 2-1', token)

    try {
      const response = yield axios.post(
        'http://localhost:4001/api/verifymail/${token}',
        action.payload
      )
      console.log('AUTH_CONFIRM_ACCOUNT_REQUEST2', response)
      console.log('AUTH_CONFIRM_ACCOUNT_REQUEST2 token', token)
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
  console.log('axios1', tokenFromStorage)
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
    // const token = action.payload.token

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
export function* saga() {
  yield all([
    fork(signInSaga),
    fork(signupSaga),
    fork(authConfirmAcountSaga),
    fork(authRefrechAcountSaga),
  ])
}
