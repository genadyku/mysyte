import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import App from './App'
import { isTokenExpired } from './helpers/auth'
import { refreshToken, unsetAuth } from './ducks/initial'

import configureStore, { history } from './redux/configureStore'

const store = configureStore()
let token = localStorage.getItem('token')
let rtoken = localStorage.getItem('refreshToken')
console.log('token: ' + token)
console.log('RTOKEN: ' + rtoken)
try {
  if (!isTokenExpired(token)) {
    console.log('token is not expired: ' + token)

    store.dispatch(refreshToken(rtoken))
    console.log('1-0', rtoken)
    token = localStorage.getItem('token')

    axios.defaults.headers.common = {
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
    }
  } else {
    store.dispatch(unsetAuth())
    console.log('token is  expired: ')
  }
} catch (e) {
  console.log(e)
}

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById('app-container')
  )
}

render()
if (module.hot) {
  // Reload components
  module.hot.accept('./App', () => {
    render()
  })
}
