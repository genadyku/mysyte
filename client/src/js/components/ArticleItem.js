import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ArticleItem extends Component {
  render() {
    const { title, titleShort, _id, slug } = this.props.article
    console.log('slug', slug)
    return (
      <li className="list-group-item" key={_id}>
        <Link style={{ color: 'blue' }} to={'article/' + slug}>
          <h6 className="list-group-item-heading"> {title}</h6>
        </Link>
        {titleShort}
      </li>
    )
  }
}
export default ArticleItem
