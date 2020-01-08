import React, { Component } from 'react'
import VerifyEmail from '../VerifyEmail'

class VerifyEmailPage extends Component {
  render() {
    return (
      <div className="container">
        <VerifyEmail token={this.props.match.params.token} />
      </div>
    )
  }
}

export default VerifyEmailPage
