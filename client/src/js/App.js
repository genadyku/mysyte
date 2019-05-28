import React from 'react'

import { ConnectedRouter } from 'connected-react-router'

import { hot } from 'react-hot-loader'
import routes from './routes'

const App = ({ history }) => {
  return <ConnectedRouter history={history}>{routes}</ConnectedRouter>
}

export default hot(module)(App)
