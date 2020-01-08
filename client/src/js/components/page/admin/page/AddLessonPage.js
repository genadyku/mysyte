import React, { Component } from 'react'
import AddLessonForm from '../AddLessonForm'

let styles = {
  marginTop: '20px',
}
class AddLessonPage extends Component {
  render() {
    return (
      <div className="container" style={styles}>
        <div className="row">
          <div className="col-lg-5 col-md-7 mx-auto">
            <h3 className="text-center mb-3">Добавить урок</h3>
            <AddLessonForm />
          </div>
        </div>
      </div>
    )
  }
}
export default AddLessonPage
