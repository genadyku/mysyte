import React, { Component } from 'react'

class AccountStatusPage extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-5 col-md-7 mx-auto">
            <h3 className="text-center mb-3">Подтверждение регистрации...</h3>
            <p>
              Пожалуйста, проверьте свою электронную почту, чтобы подтвердить
              свой аккаунт.
            </p>
            <hr />
            <p>
              Если это не ваш адрес электронной почты, вернитесь и введите
              правильный адрес.
            </p>
            <p>
              Если вы не получили наше письмо в течение 15 минут, проверьте
              папку со спамом.
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default AccountStatusPage
