import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as form } from 'redux-form'
import user from './user'
import articleReducer, { moduleName } from '../ducks/articles'

import reactarticlesReducer, { moduleNameR } from '../ducks/reactArticle'
import signinReducer, { moduleName as authModule } from '../ducks/auth'

import initialReducer, { moduleName as initialModule } from '../ducks/initial'

const rootReducer = history =>
  combineReducers({
    user,
    form,
    [moduleName]: articleReducer,
    [moduleNameR]: reactarticlesReducer,
    [authModule]: signinReducer,
    [initialModule]: initialReducer,
    router: connectRouter(history),
  })

export default rootReducer
