import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchArticleId } from '../../../ducks/articles'

class ArticlePage extends Component {
  componentDidMount() {
    this.props.fetchArticleId(this.props.match.params.slug)
  }
  render() {
    if (!this.props.article.post) return null
    const { post } = this.props.article

    console.log('ART-', post)
    return (
      <section>
        <div className="container">
          <div className="row">
            {post.title}
            <div className="articles-id">
              <h4 className="list-group-item-heading">{post.title}</h4>
              <div className="post">{post.textf}</div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return { article: state.articles.articleId }
}
export default connect(
  mapStateToProps,
  {
    fetchArticleId,
  }
)(ArticlePage)
