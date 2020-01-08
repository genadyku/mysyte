import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class LessonItem extends Component {
  render() {
    const { _id, title, num, slug } = this.props.lesson
    console.log('00-1', this.props.lesson)
    console.log('00-2', _id)

    return (
      <li className="className= list-sub" key={_id}>
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
