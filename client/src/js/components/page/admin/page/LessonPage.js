import React, { Component } from 'react'
import { connect } from 'react-redux'
import Prism from 'prismjs'

import 'prismjs/themes/prism.css'

import Code from '../../../Code'

import { fetchLessonSlug } from '../../../../ducks/lesson'

class LessonPage extends Component {
  componentDidMount() {
    console.log('param', this.props.match.params.slug)
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
      <section>
        <div className="container">
          <div className="row">
            <div className="lesson-id">
              <h4 className="list-group-item-heading">{lesson.title}</h4>
              <div className="post">
                <Code text={lesson.textf} />
              </div>
            </div>
          </div>
        </div>
      </section>
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
