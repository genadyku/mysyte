import React, { Component } from 'react'

import ActLessonsItem from './ActLessonsItem'

class LessonList extends Component {
  render() {
    const lessons = this.props.lessons

    return (
      <div>
        {lessons &&
          lessons.map(item => (
            <ActLessonsItem lessons={item} key={`article_${item._id}`} />
          ))}
      </div>
    )
  }
}
export default LessonList
