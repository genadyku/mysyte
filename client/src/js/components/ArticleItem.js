import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ArticleItem extends Component {
  render() {
    const { title, text_hort, _id } = this.props.article

    return (
      <li className="list-group-item" key={_id}>
        <Link style={{ color: 'blue' }} to={'article/' + _id}>
          <h6 className="list-group-item-heading"> {title}</h6>
        </Link>
        {text_hort}
      </li>
    )
  }
}
export default ArticleItem
