import React, { Component } from 'react'
import ForgotForm from '../ForgotForm'

let styles = {
  marginTop: '20px',
}
class ForgotPage extends Component {
  render() {
    return (
      <div className="container" style={styles}>
        <div className="row">
          <div className="col-lg-5 col-md-7 mx-auto">
            <h3 className="text-center mb-3">Забыл пароль</h3>
            <ForgotForm />
          </div>
        </div>
      </div>
    )
  }
}

export default ForgotPage
