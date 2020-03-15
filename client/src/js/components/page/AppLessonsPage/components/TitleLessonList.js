import React, { Component } from 'react'

import TitleLessonItem from './TitleLessonItem'

class TitleLessonList extends Component {
  render() {
    const { lessons } = this.props
    const titles = lessons.lessons
    if (!titles) return null

    return (
      <div>
        {titles.map(title => (
          <TitleLessonItem lesson={title} key={`chapter_${title._id}`} />
        ))}
      </div>
    )
  }
}
export default TitleLessonList
