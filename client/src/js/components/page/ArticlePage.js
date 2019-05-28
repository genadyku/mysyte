import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchArticleId } from '../../ducks/articles'

class ArticlePage extends Component {
  componentDidMount() {
    this.props.fetchArticleId(this.props.match.params.id)
  }
  render() {
    if (!this.props.articleId.post) return null
    const { post } = this.props.articleId

    return (
      <section>
        <div className="container">
          <div className="row">
            <div>
              <h4 className="list-group-item-heading">{post.title}</h4>
              <div className="post">{post.text}</div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return { articleId: state.articles.articleId }
}
export default connect(
  mapStateToProps,
  {
    fetchArticleId,
  }
)(ArticlePage)
