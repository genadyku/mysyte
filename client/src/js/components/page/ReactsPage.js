import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactArticleList from '../ReactArticleList'

import { fetchAllArticlesReact } from '../../ducks/reactArticle'

let styles = {
  marginTop: '20px',
}

class ReactsPage extends Component {
  componentDidMount() {
    this.props.fetchAllArticlesReact()
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
    return <ReactArticleList articles={posts} />
  }

  render() {
    return (
      <section>
        <div className="container" style={styles}>
          <div className="row">
            <div>
              <h4>Уроки по RE</h4>
              {this.renderArticles()}
            </div>
          </div>
        </div>
      </section>
    )
  }
}
function mapStateToProps(state) {
  return { articleList: state.reactarticles.articleList }
}
export default connect(
  mapStateToProps,
  { fetchAllArticlesReact }
)(ReactsPage)
