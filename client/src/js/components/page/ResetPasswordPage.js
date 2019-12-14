import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { resetToken } from '../../ducks/auth'

import ResetPasswordForm from '../ResetPasswordForm'

let styles = {
  marginTop: '20px',
}
var divStyle = {
  color: '#d9534f',
}
class ResetPasswordPage extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { token } = this.props.match.params

    this.props.resetT(token)
  }
  render() {
    const { errorRestore } = this.props.errorMessage

    return (
      <div className="container" style={styles}>
        <div className="row">
          <div className="col-lg-5 col-md-7 mx-auto">
            <h3 className="text-center mb-3">Смена пароля</h3>
            <ResetPasswordForm {...this.props} />
            <div>
              {errorRestore && errorRestore.message && (
                <div style={divStyle}>{errorRestore.message}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    resetT(token) {
      dispatch(resetToken(token))
    },
    onSubmit(formData) {
      console.log('val1', formData)
      console.log('val1', ownProps)
    },
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
    mapDispatchToProps
  )(ResetPasswordPage)
)
