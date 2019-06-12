import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    //console.log('route:',auth.isAuthenticated)
    render={props =>
      auth === true ? <Component {...props} /> : <Redirect to="/signin" />
    }
  />
)

const mapStateToProps = state => ({
  auth: !!state.initial.token,
})

export default connect(mapStateToProps)(PrivateRoute)
