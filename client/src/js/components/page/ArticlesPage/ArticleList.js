import React, { Component } from 'react'

import ArticleItem from './ArticleItem'

class ArticleList extends Component {
  render() {
    const { articles } = this.props

    return (
      <div>
        {articles.map(article => (
          <ArticleItem article={article} key={`article_${article._id}`} />
        ))}
      </div>
    )
  }
}
export default ArticleList
