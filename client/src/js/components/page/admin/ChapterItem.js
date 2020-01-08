import React, { Component } from 'react'
//import { Link } from 'react-router-dom'

import LessonList from './LessonList'

class ChapterItem extends Component {
  render() {
    const { chapter1, _id } = this.props.chapter
    const lessons = this.props.lessons
    console.log('44', _id)

    return (
      <div>
        <li className="list-title" key={_id}>
          <h6> {chapter1}</h6>
        </li>
        <LessonList lessons={lessons} />
      </div>
    )
  }
}
export default ChapterItem
