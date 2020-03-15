import React, { Component } from 'react'

import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import _ from 'lodash'

import TextAreaFieldGroup from '../../TextAreaFieldGroup'

import { fetchLessonEdit, LessonEditId } from '../../../ducks/lesson'

class EditAddLessonForm extends Component {
  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = { title: '', titleShort: '', textf: '' }
  }

  componentDidMount() {
    this.props.fetchLessonEdit(this.props.id)
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.lesson, this.state.lesson)) {
      if (!nextProps.lesson.lesson) return null

      this.setState({
        title: nextProps.lesson.lesson.title,
        titleShort: nextProps.lesson.lesson.titleShort,
        textf: nextProps.lesson.lesson.textf,
      })
    }
  }

  onChange(e) {
    const target = e.target
    const name = target.name
    this.setState({ [name]: e.target.value })
    e.preventDefault()
  }

  handleSubmit() {
    console.log('form', this.state.textf)
    this.props.LessonEditId(
      this.props.id,
      this.state.title,
      this.state.titleShort,
      this.state.textf
    )
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Название</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={this.state.title}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Краткое описание</label>
          <input
            type="text"
            name="titleShort"
            className="form-control"
            value={this.state.titleShort}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label>Текст урока</label>
          <TextAreaFieldGroup
            name="textf"
            value={this.state.textf}
            onChange={this.onChange}
          />
        </div>

        <div className="enter">
          <div className="row">
            <div className="col-8">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleSubmit}
              >
                Сохранить
              </button>
              <Link to="/" className="btn btn-error">
                {' '}
                Отмена
              </Link>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return { lesson: state.lesson.lesson }
}
export default connect(
  mapStateToProps,
  { fetchLessonEdit, LessonEditId }
)(EditAddLessonForm)
