import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'

import renderField from './renderField'
import { forgot } from '../ducks/auth'

var divStyle = {
  color: '#d9534f',
}

class ForgotForm extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }
  state = { success: false }

  onSubmit(values) {
    console.log('1', values)
    this.props.forgot(values)
    this.setState({ success: true })
  }
  render() {
    const { handleSubmit } = this.props
    const { success } = this.state
    const { error } = this.props.errorMessage

    return (
      <div className="container">
        {success ? (
          <div>Сообщение было отправлено; Проверь свои входящие!</div>
        ) : (
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <Field
              name="email"
              type="text"
              component={renderField}
              label="E-mail*"
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
            </div>
            <div>
              {error && error.message && (
                <div style={divStyle}>{error.message}</div>
              )}
            </div>
          </form>
        )}
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

    { forgot }
  )(ForgotForm)
)
