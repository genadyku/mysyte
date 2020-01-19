import React, { Component } from 'react'

import AddReactArticleForm from '../AddReactArticleForm'

let styles = {
  marginTop: '20px',
}
class AddReactArticlePage extends Component {
  render() {
    return (
      <div className="container" style={styles}>
        <div className="row">
          <div className="col-lg-5 col-md-7 mx-auto">
            <h3 className="text-center mb-3">Добавить статью React</h3>
            <AddReactArticleForm />
          </div>
        </div>
      </div>
    )
  }
}
export default AddReactArticlePage
