import React, { Component } from 'react'
import { connect } from 'react-redux'
import Prism from 'prismjs'

import 'prismjs/themes/prism.css'

import Code from '../../Code'

import SidebarPage from '../AppLessonsPage/SidebarPage'
import { fetchLessonSlug } from '../../../ducks/lesson'

class LessonPage extends Component {
  componentDidMount() {
    this.props.fetchLessonSlug(this.props.match.params.slug)
    Prism.highlightAll()
  }
  createMarkup(text) {
    return { __html: text }
  }
  render() {
    if (!this.props.lesson.lesson) return null
    const { lesson } = this.props.lesson

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col col-lg-2">
            <SidebarPage />
          </div>
          <div className="col col-lg-10">
            <div className="lesson-id">
              <h4 className="list-group-item-heading">{lesson.title}</h4>
              <div className="post">
                <Code text={lesson.textf} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => {
    return { lesson: state.lesson.lesson }
  },

  {
    fetchLessonSlug,
  }
)(LessonPage)
