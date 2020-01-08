import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChapterList from '../ChapterList'

import { fetchAllLessons } from '../../../../ducks/lesson'

let styles = {
  marginTop: '20px',
}

class ChaptersPage extends Component {
  componentDidMount() {
    this.props.fetchAllLessons()
  }
  renderArticles() {
    const { chapters, loading, error } = this.props.chapters

    if (error) return <h5>Server not responce ...</h5>
    if (loading == true) {
      return (
        <div>
          <h4>Loading..</h4>
        </div>
      )
    }

    return <ChapterList chapters={chapters} />
  }
  render() {
    return (
      <section>
        <div className="container" style={styles}>
          <div className="row">
            <div className="lesson-content">
              <h4>Язык программирования JavaScript</h4>
              <div className="frontpage-content__part">Часть первая</div>
              {this.renderArticles()}
            </div>
          </div>
        </div>
      </section>
    )
  }
}
/*
function mapStateToProps(state) {
  return { chapters: state.lesson }
}
*/
function mapStateToProps(state) {
  return { chapters: state.lesson.lessons }
}
export default connect(
  mapStateToProps,
  { fetchAllLessons }
)(ChaptersPage)
