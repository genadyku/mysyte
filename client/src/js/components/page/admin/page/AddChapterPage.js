import React, { Component } from 'react'

import AddChapterForm from '../AddChapterForm'

let styles = {
  marginTop: '20px',
}
class AddChapterPage extends Component {
  render() {
    return (
      <div className="container" style={styles}>
        <div className="row">
          <div className="col-lg-5 col-md-7 mx-auto">
            <h3 className="text-center mb-3">Добавить раздел</h3>
            <AddChapterForm />
          </div>
        </div>
      </div>
    )
  }
}
export default AddChapterPage
