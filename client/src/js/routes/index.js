import React from 'react'
import { Route, Switch } from 'react-router'

import Home from '../components/Home'
import NoMatch from '../components/NoMatch'
import PrivateRoute from '../components/PrivateRoute'

import NavigationPage from '../components/page/NavigationPage'
import ArticlesPage from '../components/page/ArticlesPage'
import ArticlePage from '../components/page/ArticlePage'
import SigninPage from '../components/page/SigninPage'
import SignupPage from '../components/page/SignupPage'
import ForgotPage from '../components/page/ForgotPage'
import AccountStatusPage from '../components/page/AccountStatusPage'
import VerifyEmailPage from '../components/page/VerifyEmailPage'
import ReactsPage from '../components/page/ReactsPage'
import ReactPage from '../components/page/ReactPage'
import ChaptersPage from '../components/page/admin/page/ChaptersPage'
import LessonPage from '../components/page/admin/page/LessonPage'

import ResetPasswordPage from '../components/page/ResetPasswordPage'
import AddLessonPage from '../components/page/admin/page/AddLessonPage'
import AddChapterPage from '../components/page/admin/page/AddChapterPage'

import styles from '../../style/index.css'

const routes = (
  <div className={styles.container}>
    <NavigationPage />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/articles" component={ArticlesPage} />
      <PrivateRoute exact path="/artreact" component={ReactsPage} />
      <PrivateRoute exact path="/artreact/:id" component={ReactPage} />
      <Route path="/article/:id" component={ArticlePage} />
      <Route path="/lessons" component={ChaptersPage} />
      <Route path="/lesson/:slug" component={LessonPage} />
      <Route path="/signin" component={SigninPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/forgot" component={ForgotPage} />

      <Route path="/addLesson" component={AddLessonPage} />
      <Route path="/addChapter" component={AddChapterPage} />
      <Route
        path="/reset/:token"
        render={props => <ResetPasswordPage {...props} />}
      />
      <Route path="/account/status" component={AccountStatusPage} />
      <Route path="/verifymail/:token" exact component={VerifyEmailPage} />

      <Route component={NoMatch} />
    </Switch>
  </div>
)

export default routes
