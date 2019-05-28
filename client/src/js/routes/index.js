import React from 'react'
import { Route, Switch } from 'react-router'

import Home from '../components/Home'

import NoMatch from '../components/NoMatch'
import NavigationPage from '../components/page/NavigationPage'
import ArticlesPage from '../components/page/ArticlesPage'
import ArticlePage from '../components/page/ArticlePage'
import SigninPage from '../components/page/SigninPage'
import SignupPage from '../components/page/SignupPage'
import AccountStatusPage from '../components/page/AccountStatusPage'
import VerifyEmailPage from '../components/page/VerifyEmailPage'

const routes = (
  <div>
    <NavigationPage />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/articles" component={ArticlesPage} />
      <Route path="/article/:id" component={ArticlePage} />
      <Route path="/signin" component={SigninPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/account/status" component={AccountStatusPage} />
      <Route path="/verifymail/:token" exact component={VerifyEmailPage} />

      <Route component={NoMatch} />
    </Switch>
  </div>
)

export default routes
