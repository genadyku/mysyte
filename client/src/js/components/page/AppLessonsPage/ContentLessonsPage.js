import React, { Component } from 'react'
import { connect } from 'react-redux'
import TitleLessonList from './components/TitleLessonList'

import { fetchTitleLessons } from '../../../ducks/lesson'

let styles = {
  marginTop: '20px',
}

class ContentLessonsPage extends Component {
  componentDidMount() {
    this.props.fetchTitleLessons(this.props.slug)
  }

  componentWillReceiveProps(nextProps) {
    const { slug } = nextProps
    if (this.props.slug != slug) {
      this.props.fetchTitleLessons(slug)
    }
  }

  renderArticles() {
    const { chapters } = this.props.lessons

    return <TitleLessonList lessons={chapters} />
  }
  render() {
    const { chapters } = this.props.lessons
    const { chapter1 } = chapters
    return (
      <section>
        <div className="container" style={styles}>
          <h2>{chapter1} </h2>
          <div className="row">
            <div className="articles-full">{this.renderArticles()}</div>
          </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return { lessons: state.lesson.titles }
}
export default connect(
  mapStateToProps,
  { fetchTitleLessons }
)(ContentLessonsPage)
