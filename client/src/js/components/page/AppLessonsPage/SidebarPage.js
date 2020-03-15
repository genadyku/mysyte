import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChapterList from './components/ChapterList'

import { fetchAllLessons } from '../../../ducks/lesson'

class SidebarPage extends Component {
  componentDidMount() {
    // console.log('2-1')
    this.props.fetchAllLessons()
  }
  renderArticles() {
    const { chapters } = this.props.lessons
    return <ChapterList chapters={chapters} />
  }
  render() {
    return <div className="sidebar-inner">{this.renderArticles()}</div>
  }
}

function mapStateToProps(state) {
  return { lessons: state.lesson.lessons }
}
export default connect(
  mapStateToProps,
  { fetchAllLessons }
)(SidebarPage)
