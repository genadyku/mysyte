import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'

import renderField from './renderField'

import { signup } from '../ducks/auth'

var divStyle = {
  color: '#d9534f',
}

class SignupForm extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values) {
    this.props.signup(values)
  }

  render() {
    const { handleSubmit } = this.props
    const { error } = this.props.errorMessage
    return (
      <div className="container">
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            name="username"
            type="text"
            component={renderField}
            label="Логин*"
          />

          <Field
            name="email"
            type="email"
            component={renderField}
            label="Email*"
          />
          <Field
            name="password"
            type="password"
            component={renderField}
            label="Пароль*"
          />

          <div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <Link to="/" className="btn btn-error">
              {' '}
              Cancel
            </Link>
          </div>
          {/*
          <div>{error && <div style={divStyle}>Oops! {error}</div>}</div>
          */}
          <div>
            {error && error.message && (
              <div style={divStyle}>{error.message}</div>
            )}
          </div>
        </form>
      </div>
    )
  }
}
/*
const validate = props => {
  const errors = {}
  const fields = ['email', 'password', 'repassword']

  fields.forEach(f => {
    if (!(f in props)) {
      errors[f] = `${f} is required`
    }
  })

  if (
    props.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(props.email)
  ) {
    errors.email = 'please provide valid email'
  }

  if (props.password && props.password.length < 6) {
    errors.password = 'minimum 6 characters'
  }

  if (props.password !== props.repassword) {
    errors.repassword = "passwords doesn't match"
  }

  return errors
}
*/
function mapStateToProps(state) {
  return { errorMessage: state.login, status: state.login }
}

export default reduxForm({
  form: 'auth',
})(
  connect(
    mapStateToProps,
    { signup }
  )(SignupForm)
)
