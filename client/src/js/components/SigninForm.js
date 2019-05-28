import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'

import renderField from './renderField'
import { submitin } from '../ducks/auth'

var divStyle = {
  color: '#d9534f',
}

class SigninForm extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values) {
    this.props.submitin(values)
  }
  render() {
    const { handleSubmit } = this.props

    const { error } = this.props.errorMessage

    return (
      <div className="container">
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            name="email"
            type="text"
            component={renderField}
            label="Имя пользователя*"
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

function mapStateToProps(state) {
  return { errorMessage: state.login, status: state.login }
}

export default reduxForm({
  form: 'auth',
})(
  connect(
    mapStateToProps,

    { submitin }
  )(SigninForm)
)
