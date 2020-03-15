import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchEdtLessons } from '../../../../ducks/lesson'
import ActLessonList from './ActLessonList'

class ActionLessonPage extends Component {
  componentDidMount() {
    this.props.fetchEdtLessons()
  }
  renderArticles() {
    const { lesson, loading, error } = this.props.lessons

    if (error) return <h5>Server not responce ...</h5>
    if (loading == true) {
      return (
        <div>
          <h4>Loading..</h4>
        </div>
      )
    }

    return <ActLessonList lessons={lesson} />
  }
  render() {
    return (
      <div className="container-fluid">
        <h3>Список</h3>
        {this.renderArticles()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { lessons: state.lesson.edtlessons }
}
export default connect(
  mapStateToProps,
  { fetchEdtLessons }
)(ActionLessonPage)
