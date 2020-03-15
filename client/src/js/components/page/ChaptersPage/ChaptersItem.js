import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import LessonList from './LessonList'

class ChapterItem extends Component {
  render() {
    const { chapter1, _id, slug } = this.props.chapter
    const lessons = this.props.lessons

    return (
      <div>
        <li className="sidebar-nav-link" key={_id}>
          <Link to={`/chapter/${slug}`}>{chapter1}</Link>
        </li>
        <LessonList lessons={lessons} />
      </div>
    )
  }
}
export default ChapterItem
