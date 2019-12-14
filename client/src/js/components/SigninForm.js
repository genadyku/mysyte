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
          <div className="row">
            <div className="col-8">
              <button type="submit" className="btn btn-primary">
                Вход
              </button>
              <Link to="/" className="btn btn-error">
                {' '}
                Отмена
              </Link>
            </div>
            <div className="col-4">
              <Link to="/forgot" className="btn btn-error">
                {' '}
                Забыли пароль
              </Link>
            </div>
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
const validate = props => {
  const errors = {}
  const fields = ['email', 'password']

  fields.forEach(f => {
    if (!(f in props)) {
      errors[f] = 'Заполните поле'
    }
  })

  if (
    props.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(props.email)
  ) {
    errors.email = 'Введите действительный адрес электронной почты'
  }

  if (props.password && props.password.length < 6) {
    errors.password = 'Пароль должен содержать минимум 6 знаков'
  }

  return errors
}
function mapStateToProps(state) {
  return { errorMessage: state.login, status: state.login }
}

export default reduxForm({
  form: 'auth',
  validate,
})(
  connect(
    mapStateToProps,

    { submitin }
  )(SigninForm)
)
