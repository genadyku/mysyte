import React, { Component } from 'react'
import { connect } from 'react-redux'

import Prism from 'prismjs'

import 'prismjs/themes/prism.css'

import Code from '../Code'
import { fetchArticleReactId } from '../../ducks/reactArticle'

class ReactPage extends Component {
  componentDidMount() {
    this.props.fetchArticleReactId(this.props.match.params.slug)
    Prism.highlightAll()
  }
  createMarkup(text) {
    return { __html: text }
  }

  render() {
    if (!this.props.articleId.post) return null
    const { post } = this.props.articleId

    return (
      <div className="container">
        <div className="row">
          <div className="articles-id">
            <h4 className="list-group-item-heading">{post.title}</h4>
            <Code text={post.textf} />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { articleId: state.reactarticles.articleId }
}
export default connect(
  mapStateToProps,
  {
    fetchArticleReactId,
  }
)(ReactPage)
