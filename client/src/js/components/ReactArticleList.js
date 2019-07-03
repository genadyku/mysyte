import React, { Component } from 'react'

import ReactArticleItem from './ReactArticleItem'

class ReactArticleList extends Component {
  render() {
    const { articles } = this.props

    return (
      <div>
        {articles.map(article => (
          <ReactArticleItem article={article} key={`article_${article._id}`} />
        ))}
      </div>
    )
  }
}
export default ReactArticleList
