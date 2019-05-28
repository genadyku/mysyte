import React, { Component } from 'react'
import SigninForm from '../SigninForm'

let styles = {
  marginTop: '20px',
}
class SigninPage extends Component {
  render() {
    return (
      <div className="container" style={styles}>
        <div className="row">
          <div className="col-lg-5 col-md-7 mx-auto">
            <h3 className="text-center mb-3">Вход</h3>
            <SigninForm />
          </div>
        </div>
      </div>
    )
  }
}

export default SigninPage
