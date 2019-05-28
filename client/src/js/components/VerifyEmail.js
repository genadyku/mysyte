import React, { Component } from 'react'
import { connect } from 'react-redux'
import { authConfirmAccountToken, authRefrechAccountToken } from '../ducks/auth'

var divStyle = {
  color: '#0000ff',
  cursor: 'pointer',
}
class VerifyEmail extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { token } = this.props
    console.log('VERY', token)
    this.props.authConfirmAccountToken(token)
  }

  resendEmail = () => {
    this.props.history.push('/signup')
  }
  render() {
    const { error, token } = this.props
    if (error || error.message) return null
    return (
      <div>
        <h4>MAIL</h4>
        <div>{error && <div>{error.message}</div>}</div>
        {
          <p style={divStyle} onClick={this.resendEmail(token)}>
            Resend verification code
          </p>
        }
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    error: state.login,
    status: state.login,
    //token: state.login,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    authConfirmAccountToken(token) {
      dispatch(authConfirmAccountToken(token))
    },
    authRefrechAccountToken(token) {
      dispatch(authRefrechAccountToken(token))
    },
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyEmail)
