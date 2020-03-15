import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class LessonItem extends Component {
  render() {
    const { _id, title, num, slug } = this.props.lesson

    return (
      <li className="list-sub" key={_id}>
        {num}
        <Link
          style={{ color: 'blue', marginLeft: '24px' }}
          to={'lesson/' + slug}
        >
          {title}
        </Link>
      </li>
    )
  }
}
export default LessonItem
