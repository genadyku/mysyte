import React, { Component } from 'react'

import LessonItem from './LessonItem'

class LessonList extends Component {
  render() {
    const lessons = this.props.lessons

    return (
      <div className="lesson-list">
        <ul>
          {lessons.map(lesson => (
            <LessonItem lesson={lesson} key={`lesson_${lesson._id}`} />
          ))}
        </ul>
      </div>
    )
  }
}
export default LessonList
