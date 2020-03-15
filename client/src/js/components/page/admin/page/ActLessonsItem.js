import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
//import { connect } from 'react-redux'
import { deleteLesson } from '../../../../ducks/lesson'

class ActLessonsItem extends Component {
  constructor(props) {
    super(props)

    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleEdit(e) {
    console.log('01', e)
  }
  handleDelete(e) {
    console.log('02', e.target.id)
    this.props.deleteLesson(e.target.id)
  }
  render() {
    const { title, num, _id } = this.props.lessons
    return (
      <div className="row list__lesson">
        <div className="col col-lg-1">{num}</div>
        <div className="col col-lg-8">
          <Link
            style={{ color: 'blue', marginLeft: '24px' }}
            to={'lesson/' + _id + '/edit'}
          >
            {title}
          </Link>
        </div>
        <div className="col col-lg-1">
          <Link style={{ color: 'blue' }} to={'lesson/' + _id + '/edit'}>
            <button
              type="button"
              onClick={this.handleEdit}
              className="btn btn-info"
            >
              Редактировать
            </button>
          </Link>
        </div>
        <div className="col col-lg-1">
          <button
            type="button"
            onClick={this.handleDelete}
            id={_id}
            className="btn btn-info"
          >
            Удалить
          </button>
        </div>
      </div>
    )
  }
}
//export default ActLessonsItem

export default connect(
  null,
  { deleteLesson }
)(ActLessonsItem)
