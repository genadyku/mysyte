import React, { Component } from 'react'
import VerifyEmail from '../VerifyEmail'

class VerifyEmailPage extends Component {
  render() {
    console.log('9', this.props)
    console.log('9-1', this.props.match.params.token)
    return (
      <div className="container">
        <VerifyEmail token={this.props.match.params.token} />
      </div>
    )
  }
}

export default VerifyEmailPage
