import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { unsetAuth } from '../../ducks/initial'
import NavDropdown from '../NavDropdown'
import SearchPage from '../page/SearchPage'

class Navigation extends React.Component {
  render() {
    const { isAuthenticated } = this.props

    return (
      <div className="navbar  navbar-expand-md  navbar-dark    bg-info ">
        <a
          className="navbar-brand"
          href="https://getbootstrap.com/docs/4.0/examples/jumbotron/#"
        >
          Navbar
        </a>
        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon " />
        </button>

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/articles">
              Статьи
            </Link>
            {isAuthenticated && (
              <Link className="nav-link" to="/artreact">
                REACT
              </Link>
            )}
            <NavDropdown name="Dropdown">
              <a className="dropdown-item" href="/">
                Action
              </a>
              <a className="dropdown-item" href="/">
                Another action
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item" href="/">
                Something else here
              </a>
            </NavDropdown>
          </ul>
          <ul className="navbar-nav navbar-right ">
            <Link className="nav-link" to="/signin">
              Вход
            </Link>

            <Link className="nav-link" to="/signup">
              Регистрация
            </Link>
            <Link className="nav-link" to="#" onClick={this.props.unsetAuth}>
              Выход
            </Link>
          </ul>
          <SearchPage />
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  { unsetAuth }
)(Navigation)
