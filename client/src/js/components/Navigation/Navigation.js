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
          Javascript
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
            <Link className="nav-link" to="/lessons">
              Уроки
            </Link>
            {isAuthenticated && (
              <Link className="nav-link" to="/artreact">
                REACT
              </Link>
            )}
            {isAuthenticated && (
              <NavDropdown name="Добавить">
                <Link className="dropdown-item" to="/addArticle">
                  Добавить статью
                </Link>
                <Link className="dropdown-item" to="/addReactArticle">
                  Добавить статью React
                </Link>
              </NavDropdown>
            )}
            {isAuthenticated && (
              <NavDropdown name="Добавить раздел">
                <Link className="dropdown-item" to="/addChapter">
                  Добавить
                </Link>
                <Link className="dropdown-item" to="/addLesson">
                  Добавить подраздел
                </Link>
              </NavDropdown>
            )}
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
