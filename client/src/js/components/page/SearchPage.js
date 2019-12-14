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
          className="form-control mr-sm-2"
          type="text"
          placeholder="Search"
          aria-label="Search"
        />

        <button
          className="btn   my-2 my-sm-0"
          type="button"
          onClick={this.handleClick}
        >
          Search
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
