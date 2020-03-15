import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class TitleLessonItem extends Component {
  render() {
    const { title, _id, slug, num } = this.props.lesson

    return (
      <li className="list-group-item" key={_id}>
        <Link to={`/lesson/${slug}`}>
          <h6 className="list-group-item-heading">
            {num} {title}
          </h6>
        </Link>
      </li>
    )
  }
}
export default TitleLessonItem
