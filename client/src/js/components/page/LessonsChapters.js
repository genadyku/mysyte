import React, { Component } from 'react'
import { connect } from 'react-redux'

import LessonsChapterItem from './LessonsChapterItem'

class LessonsChapters extends Component {
  render() {
    const { chapters } = this.props.lessons

    return (
      <div className="sidebar-inner">
        <ul>
          {chapters.map(lesson => (
            <LessonsChapterItem lesson={lesson} key={`lesson_${lesson._id}`} />
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { lessons: state.lesson.lessons }
}
export default connect(
  mapStateToProps,
  null
)(LessonsChapters)
