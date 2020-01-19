import React, { Component } from 'react'

import AddArticleForm from '../AddArticleForm'

let styles = {
  marginTop: '20px',
}
class AddArticlePage extends Component {
  render() {
    return (
      <div className="container" style={styles}>
        <div className="row">
          <div className="col-lg-5 col-md-7 mx-auto">
            <h3 className="text-center mb-3">Добавить статью</h3>
            <AddArticleForm />
          </div>
        </div>
      </div>
    )
  }
}
export default AddArticlePage
