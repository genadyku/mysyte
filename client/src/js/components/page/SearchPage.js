import React, { Component } from 'react'
import { connect } from 'react-redux'

import { SearchArticles } from '../../ducks/articles'

class SearchPage extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(e) {
    this.props.SearchArticles()
    e.preventDefault()
  }
  render() {
    return (
      <form className="form-inline my-1 my-lg-0">
        <input
          className="form-control searchform  mr-sm-1"
          type="text"
          placeholder="Search"
          aria-label="Search"
        />

        <button
          className="btn searchform  my-2 my-sm-0"
          type="button"
          onClick={this.handleClick}
        >
          {' '}
          Поиск
        </button>
      </form>
    )
  }
}

export default connect(
  null,
  {
    SearchArticles,
  }
)(SearchPage)
