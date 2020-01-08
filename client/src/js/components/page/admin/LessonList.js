import React, { Component } from 'react'

import LessonItem from './LessonItem'

class LessonList extends Component {
  render() {
    const lessons = this.props.lessons
    console.log('00-88', lessons)
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
