import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ReactArticleItem extends Component {
  render() {
    const { title, titleShort, _id, slug } = this.props.article
    console.log('slug-2', slug)
    return (
      <li className="list-group-item" key={_id}>
        <Link style={{ color: 'blue' }} to={'artreact/' + slug}>
          <h6 className="list-group-item-heading"> {title}</h6>
        </Link>
        {titleShort}
      </li>
    )
  }
}
export default ReactArticleItem
