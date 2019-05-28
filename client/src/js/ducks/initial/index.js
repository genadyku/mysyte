import { take, put, takeLatest, call, all } from 'redux-saga/effects'

import axios from 'axios'

import { push } from 'connected-react-router'
import localStorage from '../../lib/localStorage'

export const moduleName = 'initial'
const AUTH_SET = 'AUTH_SET'
const AUTH_UNSET = 'AUTH_UNSET'
const REFRESH_TOKEN = 'REFRESH_TOKEN'

const api = {
  refreshToken(refreshToken) {
    if (!refreshToken) {
      console.log(
        'Token must be provided to the api call refreshToken. file auth.api.js'
      )
      return false
    }
    var config = {
      headers: { Authorization: 'Bearer ' + refreshToken },
    }

    return axios.get('http://localhost:4001/api' + '/refreshToken', config)
  },
}

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
  console.log('UNAUTH-11')
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
  return {
    type: AUTH_UNSET,
  }
}

export const refreshToken = refreshToken => {
  return {
    type: REFRESH_TOKEN,
    refreshToken,
  }
}

const initialSate = {
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
}

export default (state = initialSate, action) => {
  switch (action.type) {
    case AUTH_SET:
      console.log('AUTH_SET3-1', action.token)
      return {
        token: action.token,
        refreshToken: action.refreshToken,
      }
    case AUTH_UNSET:
      console.log('RED UNAUTH_SET-3')
      return {
        token: null,
        refreshToken: null,
      }
    default:
      return state
  }
}
export function* refreshTokenAsync(action) {
  const response = yield call(api.refreshToken, action.refreshToken)
  console.log('1-1', response)
  const token = response.data.token
  const refreshToken = response.data.refreshToken

  yield put(setAuth(token, refreshToken))
}

export function* watchRefreshToken() {
  yield take(REFRESH_TOKEN, refreshTokenAsync)
}

export function* logoutUserAsync() {
  console.log('UNSETAUT-PUSH')
  yield put(push('/'))
}

export function* watchLogoutUser() {
  yield takeLatest(AUTH_UNSET, logoutUserAsync)
}

export function* saga() {
  yield all([watchLogoutUser(), watchRefreshToken()])
}
