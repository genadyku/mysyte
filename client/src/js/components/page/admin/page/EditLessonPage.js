import React, { Component } from 'react'
import EditLessonForm from '../EditLessonForm'

let styles = {
  marginTop: '20px',
}
class EditLessonPage extends Component {
  render() {
    return (
      <div className="container" style={styles}>
        <div className="row">
          <div className="col-lg-5 col-md-7 mx-auto">
            <h3 className="text-center mb-3">Редактировать урок</h3>
            <EditLessonForm id={this.props.match.params.id} />
          </div>
        </div>
      </div>
    )
  }
}
export default EditLessonPage
