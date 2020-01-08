import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

import renderField from './renderField'

import { setpassw } from '../ducks/auth'

class ResetPasswordForm extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values) {
    const { token } = this.props.match.params
    values.token = token
    this.props.setpassw(values)
  }
  render() {
    const { handleSubmit } = this.props

    return (
      <div className="container">
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            name="password"
            type="password"
            component={renderField}
            label="Пароль*"
          />
          <Field
            name="password2"
            type="password"
            component={renderField}
            label="Пароль*"
          />

          <div className="row">
            <div className="col-8">
              <button type="submit" className="btn btn-primary">
                Вход
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

function validate(props) {
  const errors = {}
  const fields = ['password', 'password2']

  fields.forEach(f => {
    if (!(f in props)) {
      errors[f] = 'Заполните поле'
    }
  })

  if (props.password && props.password.length < 6) {
    errors.newpassword = 'Пароль должен содержать минимум 6 знаков'
  }

  if (props.password !== props.password2) {
    errors.password2 = 'Ошибка при подтверждении пароля'
  }

  return errors
}

export default reduxForm({
  form: 'resetpassword',
  validate,
  asyncBlurFields: [],
})(
  connect(
    null,

    { setpassw }
  )(ResetPasswordForm)
)
