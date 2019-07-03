import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ReactArticleItem extends Component {
  render() {
    const { title, texthort, _id } = this.props.article

    return (
      <li className="list-group-item" key={_id}>
        <Link style={{ color: 'blue' }} to={'artreact/' + _id}>
          <h6 className="list-group-item-heading"> {title}</h6>
        </Link>
        {texthort}
      </li>
    )
  }
}
export default ReactArticleItem
