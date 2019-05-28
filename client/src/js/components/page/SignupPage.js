import React, { Component } from 'react'
import SignupForm from '../SignupForm'

let styles = {
  marginTop: '20px',
}
class SignupPage extends Component {
  render() {
    return (
      <div className="container" style={styles}>
        <div className="row">
          <div className="col-lg-5 col-md-7 mx-auto">
            <h3 className="text-center mb-3">Регистрация</h3>
            <SignupForm />
          </div>
        </div>
      </div>
    )
  }
}

export default SignupPage
