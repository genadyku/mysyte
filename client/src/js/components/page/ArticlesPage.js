import React, { Component } from 'react'
import { connect } from 'react-redux'
import ArticleList from '../ArticleList'

import { fetchAllArticles } from '../../ducks/articles'

let styles = {
  marginTop: '20px',
}

class ArticlesPage extends Component {
  componentDidMount() {
    this.props.fetchAllArticles()
  }
  renderArticles() {
    const { posts, loading, error } = this.props.articleList

    if (error) return <h5>Server not responce ...</h5>
    if (loading == true) {
      return (
        <div>
          <h4>Loading..</h4>
        </div>
      )
    }
    return <ArticleList articles={posts} />
  }
  render() {
    return (
      <section>
        <div className="container" style={styles}>
          <div className="row">
            <div>
              <h4>Статьи</h4>
              {this.renderArticles()}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return { articleList: state.articles.articleList }
}
export default connect(
  mapStateToProps,
  { fetchAllArticles }
)(ArticlesPage)
